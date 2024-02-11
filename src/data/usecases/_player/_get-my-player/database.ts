import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import {
  GetMeUsecase,
  GetMyPlayerUsecase,
  GetPlayerUsecase,
} from '@domain/usecases';

import {
  CacheProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class DatabaseGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly getPlayer: GetPlayerUsecase;
  private readonly cache: CacheProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.getPlayer = deps.getPlayer;
    this.cache = deps.cache;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();

    if (!me) {
      const myPlayerID = await this.cache.get<string>('myPlayerID');

      if (!myPlayerID) return null;

      const myPlayer = await this.getPlayer.execute(myPlayerID);

      return myPlayer;
    }

    try {
      const table = await this.tableGenerator.getTable();

      const [player] = await this.database.select<PlayerModel>(
        table,
        (player) => player.userID === me.id,
      );

      return player || null;
    } catch {
      throw new FailedError({ metadata: { tried: 'get my player' } });
    }
  }
}

export namespace DatabaseGetMyPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    getPlayer: GetPlayerUsecase;
    cache: CacheProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
