import { GameModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CreateGameUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateGameUsecase implements CreateGameUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseCreateGameUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(payload: CreateGameUsecase.Payload): Promise<GameModel> {
    const { hostID } = payload;

    try {
      const table = await this.tableGenerator.getTable();

      const game = await this.database.insert<GameModel>(table, {
        hostID,
      });

      return game;
    } catch {
      throw new FailedError({ metadata: { tried: 'create game' } });
    }
  }
}

export namespace DatabaseCreateGameUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
