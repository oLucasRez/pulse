import { ForbiddenError, NotFoundError } from '@domain/errors';
import { CentralFactModel } from '@domain/models';

import { ICentralFactDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class CentralFactDAO implements ICentralFactDAO {
  private currentGameID: string | null;
  private centralFactsByID: Map<string, CentralFactModel.DTO>;

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
    this.centralFactsByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access central-facts without current-game' },
      });

    return `games/${this.currentGameID}/centralFacts`;
  }

  private fillCache(centralFacts: CentralFactModel.DTO[]): void {
    this.centralFactsByID.clear();
    centralFacts.map((centralFact) =>
      this.centralFactsByID.set(centralFact.id, centralFact),
    );
  }

  private async fetchCentralFacts(): Promise<void> {
    await Asyncleton.run('CentralFactDAO.fetchCentralFacts', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access centralFacts without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access centralFacts without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const centralFacts = await this.database.select<CentralFactModel.DTO>(
        table,
      );

      this.fillCache(centralFacts);
    });
  }

  public async getAll(): Promise<CentralFactModel.DTO[]> {
    await this.fetchCentralFacts();

    return Array.from(this.centralFactsByID.values());
  }

  public async getByID(id: string): Promise<CentralFactModel.DTO | null> {
    await this.fetchCentralFacts();

    return this.centralFactsByID.get(id) ?? null;
  }

  public async create(
    payload: ICentralFactDAO.CreatePayload,
  ): Promise<CentralFactModel.DTO> {
    await this.fetchCentralFacts();

    const table = await this.getTable();

    const centralFact = await this.database.insert<CentralFactModel.DTO>(
      table,
      payload,
    );

    this.centralFactsByID.set(centralFact.id, centralFact);

    return centralFact;
  }

  public async update(
    id: string,
    payload: ICentralFactDAO.UpdatePayload,
  ): Promise<CentralFactModel.DTO> {
    await this.fetchCentralFacts();

    const table = await this.getTable();

    const centralFact = await this.database.update<CentralFactModel.DTO>(
      table,
      id,
      payload,
    );

    this.centralFactsByID.set(id, centralFact);

    return centralFact;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchCentralFacts();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.centralFactsByID.delete(id);
  }

  public async watch(
    callback: (dtos: CentralFactModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchCentralFacts();

    const table = await this.getTable();

    return this.socket.watch<CentralFactModel.DTO>(table, (centralFacts) => {
      this.fillCache(centralFacts);

      callback(centralFacts);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
