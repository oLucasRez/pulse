import { GameModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { GetCurrentGameUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({ metadata: { tried: 'get current game' } });

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
    getMe: GetMeUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
