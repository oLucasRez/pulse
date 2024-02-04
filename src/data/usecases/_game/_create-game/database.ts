import { GameModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { CreateGameUsecase, GetCurrentUserUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateGameUsecase implements CreateGameUsecase {
  private readonly getCurrentUser: GetCurrentUserUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCreateGameUsecase.Deps) {
    this.getCurrentUser = deps.getCurrentUser;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(payload: CreateGameUsecase.Payload): Promise<GameModel> {
    const { title = null } = payload;

    const user = await this.getCurrentUser.execute();
    if (!user) throw new ForbiddenError({ metadata: { tried: 'create game' } });

    try {
      const table = await this.tableGenerator.getTable();

      const game = await this.database.insert<GameModel>(table, {
        hostID: user.id,
        title,
      });

      return game;
    } catch {
      throw new FailedError({ metadata: { tried: 'create game' } });
    }
  }
}

export namespace DatabaseCreateGameUsecase {
  export type Deps = {
    getCurrentUser: GetCurrentUserUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
