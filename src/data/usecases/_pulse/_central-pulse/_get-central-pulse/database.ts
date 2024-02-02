import { CentralPulseModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetCentralPulseUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetCentralPulseUsecase implements GetCentralPulseUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetCentralPulseUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<CentralPulseModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const [centralPulse] = await this.database.select<CentralPulseModel>(
        table,
      );

      if (!centralPulse) throw 'error';

      return centralPulse;
    } catch {
      throw new NotFoundError({
        metadata: { entity: 'CentralPulse' },
      });
    }
  }
}

export namespace DatabaseGetCentralPulseUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
