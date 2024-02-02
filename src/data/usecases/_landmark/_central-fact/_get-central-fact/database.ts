import { CentralFactModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetCentralFactUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetCentralFactUsecase implements GetCentralFactUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetCentralFactUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<CentralFactModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const [centralFact] = await this.database.select<CentralFactModel>(table);

      if (!centralFact) throw 'error';

      return centralFact;
    } catch {
      throw new NotFoundError({
        metadata: { entity: 'CentralFact' },
      });
    }
  }
}

export namespace DatabaseGetCentralFactUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
