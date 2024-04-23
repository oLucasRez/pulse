import { ForbiddenError, NotFoundError } from '@domain/errors';
import { LightSpotModel } from '@domain/models';

import { ILightSpotDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class LightSpotDAO implements ILightSpotDAO {
  private currentGameID: string | null;
  private lightSpotsByID: Map<string, LightSpotModel.DTO>;

  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly userDAO: IUserDAO;
  private readonly sessionGetter: SessionGetterProtocol;

  public constructor({ database, socket, userDAO, sessionGetter }: Deps) {
    this.database = database;
    this.socket = socket;
    this.userDAO = userDAO;
    this.sessionGetter = sessionGetter;

    this.currentGameID = null;
    this.lightSpotsByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access light-spots without current-game' },
      });

    return `games/${this.currentGameID}/lightSpots`;
  }

  private fillCache(lightSpots: LightSpotModel.DTO[]): void {
    this.lightSpotsByID.clear();
    lightSpots.map((lightSpot) =>
      this.lightSpotsByID.set(lightSpot.id, lightSpot),
    );
  }

  private async fetchLightSpots(): Promise<void> {
    await Asyncleton.run('LightSpotDAO.fetchLightSpots', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access light-spots without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access light-spots without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const lightSpots = await this.database.select<LightSpotModel.DTO>(table);

      this.fillCache(lightSpots);
    });
  }

  public async getAll(): Promise<LightSpotModel.DTO[]> {
    await this.fetchLightSpots();

    return Array.from(this.lightSpotsByID.values());
  }

  public async getByID(id: string): Promise<LightSpotModel.DTO | null> {
    await this.fetchLightSpots();

    return this.lightSpotsByID.get(id) ?? null;
  }

  public async create(
    payload: ILightSpotDAO.CreatePayload,
  ): Promise<LightSpotModel.DTO> {
    await this.fetchLightSpots();

    const table = await this.getTable();

    const lightSpot = await this.database.insert<LightSpotModel.DTO>(
      table,
      payload,
    );

    this.lightSpotsByID.set(lightSpot.id, lightSpot);

    return lightSpot;
  }

  public async update(
    id: string,
    payload: ILightSpotDAO.UpdatePayload,
  ): Promise<LightSpotModel.DTO> {
    await this.fetchLightSpots();

    const table = await this.getTable();

    const lightSpot = await this.database.update<LightSpotModel.DTO>(
      table,
      id,
      payload,
    );

    this.lightSpotsByID.set(id, lightSpot);

    return lightSpot;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchLightSpots();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.lightSpotsByID.delete(id);
  }

  public async watch(
    callback: (dtos: LightSpotModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchLightSpots();

    const table = await this.getTable();

    return this.socket.watch<LightSpotModel.DTO>(table, (lightSpots) => {
      this.fillCache(lightSpots);

      callback(lightSpots);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
