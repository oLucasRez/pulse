import { CentralPulseModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import {
  CreateCentralFactUsecase,
  CreateCentralPulseUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateCentralPulseUsecase
  implements CreateCentralPulseUsecase
{
  private readonly createCentralFact: CreateCentralFactUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseCreateCentralPulseUsecase.Deps) {
    this.createCentralFact = deps.createCentralFact;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<CentralPulseModel> {
    try {
      const centralFact = await this.createCentralFact.execute();

      const table = await this.tableGenerator.getTable();

      const centralPulse = await this.database.insert<CentralPulseModel>(
        table,
        {
          origin: { x: 0, y: 0 },
          gap: 1,
          amount: 0,
          landmarkID: centralFact.id,
        },
      );

      return centralPulse;
    } catch {
      throw new FailedError({ metadata: { tried: 'create central-pulse' } });
    }
  }
}

export namespace DatabaseCreateCentralPulseUsecase {
  export type Deps = {
    createCentralFact: CreateCentralFactUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
