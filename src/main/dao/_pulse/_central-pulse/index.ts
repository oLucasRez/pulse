import { ForbiddenError, NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';

import { ICentralPulseDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class CentralPulseDAO implements ICentralPulseDAO {
  private currentGameID: string | null;
  private centralPulsesByID: Map<string, CentralPulseModel.DTO>;

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
    this.centralPulsesByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access central-pulses without current-game' },
      });

    return `games/${this.currentGameID}/centralPulses`;
  }

  private fillCache(centralPulses: CentralPulseModel.DTO[]): void {
    this.centralPulsesByID.clear();
    centralPulses.map((centralPulse) =>
      this.centralPulsesByID.set(centralPulse.id, centralPulse),
    );
  }

  private async fetchCentralPulses(): Promise<void> {
    await Asyncleton.run('CentralPulseDAO.fetchCentralPulses', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access central-pulses without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access central-pulses without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const centralPulses = await this.database.select<CentralPulseModel.DTO>(
        table,
      );

      this.fillCache(centralPulses);
    });
  }

  public async getByID(id: string): Promise<CentralPulseModel.DTO | null> {
    await this.fetchCentralPulses();

    return this.centralPulsesByID.get(id) ?? null;
  }

  public async create(
    payload: ICentralPulseDAO.CreatePayload,
  ): Promise<CentralPulseModel.DTO> {
    await this.fetchCentralPulses();

    const table = await this.getTable();

    const centralPulse = await this.database.insert<CentralPulseModel.DTO>(
      table,
      payload,
    );

    this.centralPulsesByID.set(centralPulse.id, centralPulse);

    return centralPulse;
  }

  public async update(
    id: string,
    payload: ICentralPulseDAO.UpdatePayload,
  ): Promise<CentralPulseModel.DTO> {
    await this.fetchCentralPulses();

    const table = await this.getTable();

    const centralPulse = await this.database.update<CentralPulseModel.DTO>(
      table,
      id,
      payload,
    );

    this.centralPulsesByID.set(id, centralPulse);

    return centralPulse;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchCentralPulses();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.centralPulsesByID.delete(id);
  }

  public async watch(
    callback: (dtos: CentralPulseModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchCentralPulses();

    const table = await this.getTable();

    return this.socket.watch<CentralPulseModel.DTO>(table, (centralPulses) => {
      this.fillCache(centralPulses);

      callback(centralPulses);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
