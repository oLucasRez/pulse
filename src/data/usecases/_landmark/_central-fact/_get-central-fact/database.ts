import { CentralFactModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { CentralFactHydrator } from '@domain/hydration';

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

      const [centralFact] = await this.database.select<CentralFactModel.JSON>(
        table,
      );

      if (!centralFact) throw 'error';

      return CentralFactHydrator.hydrate(centralFact);
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
