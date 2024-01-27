import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { GetPlayersUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseGetPlayersUsecase implements GetPlayersUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetPlayersUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
  }

  public async execute(): Promise<PlayerModel[]> {
    try {
      const players = await this.database.select<PlayerModel>(this.table);

      return players;
    } catch {
      throw new FailedError('Failed to get players');
    }
  }
}

export namespace DatabaseGetPlayersUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
  };
}
