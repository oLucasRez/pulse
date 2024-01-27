import { FailedError } from '@domain/errors';

import { DeleteDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseDeleteDiceUsecase implements DeleteDiceUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseDeleteDiceUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<void> {
    try {
      await this.database.delete(this.table, id);
    } catch {
      throw new FailedError(`Failed to delete player ${id}`);
    }
  }
}

export namespace DatabaseDeleteDiceUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
  };
}
