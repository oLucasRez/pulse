import { GameModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { GetCurrentUserUsecase, GetGamesUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetGamesUsecase implements GetGamesUsecase {
  private readonly getCurrentUser: GetCurrentUserUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetGamesUsecase.Deps) {
    this.getCurrentUser = deps.getCurrentUser;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<GameModel[]> {
    const user = await this.getCurrentUser.execute();
    if (!user) throw new ForbiddenError({ metadata: { tried: 'get games' } });

    try {
      const table = await this.tableGenerator.getTable();

      const games = await this.database.select<GameModel>(
        table,
        (game) => game.hostID === user.id,
      );

      return games;
    } catch {
      throw new FailedError({ metadata: { tried: 'get games' } });
    }
  }
}

export namespace DatabaseGetGamesUsecase {
  export type Deps = {
    getCurrentUser: GetCurrentUserUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
