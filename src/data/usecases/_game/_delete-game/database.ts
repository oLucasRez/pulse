import { FailedError } from '@domain/errors';

import { DeleteGameUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseDeleteGameUsecase implements DeleteGameUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseDeleteGameUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<void> {
    try {
      const table = await this.tableGenerator.getTable();

      await this.database.delete(table, id);
    } catch {
      throw new FailedError({ metadata: { tried: 'delete game' } });
    }
  }
}

export namespace DatabaseDeleteGameUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
