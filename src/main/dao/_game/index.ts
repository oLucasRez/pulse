import { ForbiddenError } from '@domain/errors';
import { GameModel } from '@domain/models';

import { IGameDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class GameDAO implements IGameDAO {
  private uid: string | null;
  private gamesByID: Map<string, GameModel.DTO>;

  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly sessionGetter: SessionGetterProtocol;

  public constructor({ database, socket, sessionGetter }: Deps) {
    this.database = database;
    this.socket = socket;
    this.sessionGetter = sessionGetter;

    this.uid = null;
    this.gamesByID = new Map();
  }

  private fillCache(games: GameModel.DTO[]): void {
    this.gamesByID.clear();
    games.map((game) => this.gamesByID.set(game.id, game));
  }

  private async fetchGames(): Promise<void> {
    await Asyncleton.run('GameDAO.fetchGames', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access games without session' },
        });

      if (uid === this.uid) return;

      this.uid = uid;

      const games = await this.database.select<GameModel.DTO>('games');

      this.fillCache(games);
    });
  }

  public async getAll(): Promise<GameModel.DTO[]> {
    await this.fetchGames();

    return Array.from(this.gamesByID.values());
  }

  public async getByID(id: string): Promise<GameModel.DTO | null> {
    await this.fetchGames();

    return this.gamesByID.get(id) ?? null;
  }

  public async create(payload: IGameDAO.CreatePayload): Promise<GameModel.DTO> {
    await this.fetchGames();

    const game = await this.database.insert<GameModel.DTO>('games', payload);

    this.gamesByID.set(game.id, game);

    return game;
  }

  public async update(
    id: string,
    payload: IGameDAO.UpdatePayload,
  ): Promise<GameModel.DTO> {
    await this.fetchGames();

    const game = await this.database.update<GameModel.DTO>(
      'games',
      id,
      payload,
    );

    this.gamesByID.set(id, game);

    return game;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchGames();

    await this.database.delete('games', id);

    this.gamesByID.delete(id);
  }

  public async watch(
    callback: (dtos: GameModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchGames();

    return this.socket.watch<GameModel.DTO>('games', (games) => {
      this.fillCache(games);

      callback(games);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  sessionGetter: SessionGetterProtocol;
};
