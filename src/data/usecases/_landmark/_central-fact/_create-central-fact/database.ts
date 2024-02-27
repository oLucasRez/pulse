import { CentralFactModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CentralFactHydrator } from '@data/hydration';

import { CreateCentralFactUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

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

      const centralFact = await this.database.insert<CentralFactModel.JSON>(
        table,
        {
          position: { x: 0, y: 0 },
          description: '',
        },
      );

      return CentralFactHydrator.hydrate(centralFact);
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
