import { GameModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GameHydrator } from '@domain/hydration';

import { GetGameUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetGameUsecase implements GetGameUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetGameUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<GameModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const [game] = await this.database.select<GameModel.JSON>(
        table,
        (game) => game.id === id,
      );

      if (!game) throw 'error';

      return GameHydrator.hydrate(game);
    } catch {
      throw new NotFoundError({
        metadata: { entity: 'Game', prop: 'id', value: id },
      });
    }
  }
}

export namespace DatabaseGetGameUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
