import { GameModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetCurrentGameUsecase, GetCurrentUserUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getCurrentUser: GetCurrentUserUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetCurrentGameUsecase.Deps) {
    this.getCurrentUser = deps.getCurrentUser;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<GameModel | null> {
    const user = await this.getCurrentUser.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    const table = await this.tableGenerator.getTable();

    const [game] = await this.database.select<GameModel>(
      table,
      (value) => value.id === user.currentGameID,
    );

    return game;
  }
}

export namespace DatabaseGetCurrentGameUsecase {
  export type Deps = {
    getCurrentUser: GetCurrentUserUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
