import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { PlayerHydrator } from '@domain/hydration';

import { GetPlayersUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetPlayersUsecase implements GetPlayersUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetPlayersUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<PlayerModel[]> {
    try {
      const table = await this.tableGenerator.getTable();

      const players = await this.database.select<PlayerModel.JSON>(table);

      return players.map(PlayerHydrator.hydrate);
    } catch {
      throw new FailedError({ metadata: { tried: 'get players' } });
    }
  }
}

export namespace DatabaseGetPlayersUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
