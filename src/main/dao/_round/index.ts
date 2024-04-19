import { ForbiddenError, NotFoundError } from '@domain/errors';
import { RoundModel } from '@domain/models';

import { IRoundDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class RoundDAO implements IRoundDAO {
  private currentGameID: string | null;
  private roundsByID: Map<string, RoundModel.DTO>;

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
    this.roundsByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access rounds without current-game' },
      });

    return `games/${this.currentGameID}/rounds`;
  }

  private fillCache(rounds: RoundModel.DTO[]): void {
    this.roundsByID.clear();
    rounds.map((round) => this.roundsByID.set(round.id, round));
  }

  private async fetchRounds(): Promise<void> {
    await Asyncleton.run('RoundDAO.fetchRounds', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access rounds without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access rounds without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const rounds = await this.database.select<RoundModel.DTO>(table);

      this.fillCache(rounds);
    });
  }

  public async getAll(): Promise<RoundModel.DTO[]> {
    await this.fetchRounds();

    return Array.from(this.roundsByID.values());
  }

  public async getByID(id: string): Promise<RoundModel.DTO | null> {
    await this.fetchRounds();

    return this.roundsByID.get(id) ?? null;
  }

  public async create(
    payload: IRoundDAO.CreatePayload,
  ): Promise<RoundModel.DTO> {
    await this.fetchRounds();

    const table = await this.getTable();

    const round = await this.database.insert<RoundModel.DTO>(table, payload);

    this.roundsByID.set(round.id, round);

    return round;
  }

  public async update(
    id: string,
    payload: IRoundDAO.UpdatePayload,
  ): Promise<RoundModel.DTO> {
    await this.fetchRounds();

    const table = await this.getTable();

    const round = await this.database.update<RoundModel.DTO>(
      table,
      id,
      payload,
    );

    this.roundsByID.set(id, round);

    return round;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchRounds();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.roundsByID.delete(id);
  }

  public async watch(
    callback: (dtos: RoundModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchRounds();

    const table = await this.getTable();

    return this.socket.watch<RoundModel.DTO>(table, (rounds) => {
      this.fillCache(rounds);

      callback(rounds);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
