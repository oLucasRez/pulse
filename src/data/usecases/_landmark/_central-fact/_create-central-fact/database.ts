import { CentralFactModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CreateCentralFactUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { Vector } from '@domain/utils';

export class DatabaseCreateCentralFactUsecase
  implements CreateCentralFactUsecase
{
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseCreateCentralFactUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<CentralFactModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const centralFact = await this.database.insert<CentralFactModel>(table, {
        position: Vector(0, 0),
        description: '',
      });

      return centralFact;
    } catch (e) {
      throw new FailedError({ metadata: { tried: 'create central-fact' } });
    }
  }
}

export namespace DatabaseCreateCentralFactUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
