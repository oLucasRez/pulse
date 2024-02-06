import { GameModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { GetGamesUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetGamesUsecase implements GetGamesUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetGamesUsecase.Deps) {
    this.getMe = deps.getMe;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<GameModel[]> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get games' } });

    try {
      const table = await this.tableGenerator.getTable();

      const games = await this.database.select<GameModel>(
        table,
        (game) => game.hostID === me.id,
      );

      return games;
    } catch {
      throw new FailedError({ metadata: { tried: 'get games' } });
    }
  }
}

export namespace DatabaseGetGamesUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
