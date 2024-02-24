import { CentralPulseModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { CentralPulseHydrator } from '@domain/hydration';

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

      const [json] = await this.database.select<CentralPulseModel.JSON>(table);

      if (!json) throw 'error';

      return CentralPulseHydrator.hydrate(json);
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
