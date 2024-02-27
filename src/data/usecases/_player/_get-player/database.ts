import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetPlayerUsecase implements GetPlayerUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetPlayerUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<PlayerModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const [player] = await this.database.select<PlayerModel.JSON>(
        table,
        (player) => player.id === id,
      );

      if (!player) throw 'error';

      return PlayerHydrator.hydrate(player);
    } catch {
      throw new NotFoundError({
        metadata: { entity: 'Player', prop: 'id', value: id },
      });
    }
  }
}

export namespace DatabaseGetPlayerUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
