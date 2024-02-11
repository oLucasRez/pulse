import { GameModel } from '@domain/models';

import {
  GetCurrentGameUsecase,
  GetGameUsecase,
  GetMeUsecase,
} from '@domain/usecases';

import {
  CacheProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class DatabaseGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly cache: CacheProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.getMe = deps.getMe;
    this.cache = deps.cache;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me) {
      const gameID = await this.cache.get<string>('currentGameID');

      if (!gameID) return null;

      const game = await this.getGame.execute(gameID);

      return game;
    }

    const table = await this.tableGenerator.getTable();

    const [game] = await this.database.select<GameModel>(
      table,
      (value) => value.id === me.currentGameID,
    );

    return game || null;
  }
}

export namespace DatabaseGetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    getMe: GetMeUsecase;
    cache: CacheProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
