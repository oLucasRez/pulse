import { ForbiddenError, NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';

import { IPlayerDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class PlayerDAO implements IPlayerDAO {
  private currentGameID: string | null;
  private playersByID: Map<string, PlayerModel.DTO>;
  private playersByUID: Map<string, PlayerModel.DTO>;
  private playersByOrder: Map<number, PlayerModel.DTO>;

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
    this.playersByID = new Map();
    this.playersByUID = new Map();
    this.playersByOrder = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access players without current-game' },
      });

    return `games/${this.currentGameID}/players`;
  }

  private fillCache(players: PlayerModel.DTO[]): void {
    this.playersByID.clear();
    this.playersByUID.clear();
    this.playersByOrder.clear();
    players.map((player) => {
      this.playersByID.set(player.id, player);
      this.playersByUID.set(player.uid, player);
      this.playersByOrder.set(player.order, player);
    });
  }

  private async fetchPlayers(): Promise<void> {
    await Asyncleton.run('PlayerDAO.fetchPlayers', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access players without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access players without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const players = await this.database.select<PlayerModel.DTO>(table);

      this.fillCache(players);
    });
  }

  public async getAll(): Promise<PlayerModel.DTO[]> {
    await this.fetchPlayers();

    return Array.from(this.playersByID.values());
  }

  public async getUnbanned(): Promise<PlayerModel.DTO[]> {
    const allPlayers = await this.getAll();

    return allPlayers.filter(({ banned }) => !banned);
  }

  public async getByID(id: string): Promise<PlayerModel.DTO | null> {
    await this.fetchPlayers();

    return this.playersByID.get(id) ?? null;
  }

  public async getByUID(uid: string): Promise<PlayerModel.DTO | null> {
    await this.fetchPlayers();

    return this.playersByUID.get(uid) ?? null;
  }

  public async getByOrder(order: number): Promise<PlayerModel.DTO | null> {
    await this.fetchPlayers();

    return this.playersByOrder.get(order) ?? null;
  }

  public async create(
    payload: IPlayerDAO.CreatePayload,
  ): Promise<PlayerModel.DTO> {
    await this.fetchPlayers();

    const table = await this.getTable();

    const player = await this.database.insert<PlayerModel.DTO>(table, payload);

    this.playersByID.set(player.id, player);

    return player;
  }

  public async update(
    id: string,
    payload: IPlayerDAO.UpdatePayload,
  ): Promise<PlayerModel.DTO> {
    await this.fetchPlayers();

    const table = await this.getTable();

    const player = await this.database.update<PlayerModel.DTO>(
      table,
      id,
      payload,
    );

    this.playersByID.set(id, player);

    return player;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchPlayers();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.playersByID.delete(id);
  }

  public async watch(
    callback: (dtos: PlayerModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchPlayers();

    const table = await this.getTable();

    return this.socket.watch<PlayerModel.DTO>(table, (players) => {
      this.fillCache(players);

      callback(players);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
