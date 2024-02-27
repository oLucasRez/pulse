import { CentralFactModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CentralFactHydrator } from '@data/hydration';

import {
  ChangeCentralFactUsecase,
  GetCentralFactUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeCentralFactUsecase
  implements ChangeCentralFactUsecase
{
  private readonly tableGenerator: TableGenerator;
  private readonly getCentralFact: GetCentralFactUsecase;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseChangeCentralFactUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.getCentralFact = deps.getCentralFact;
    this.database = deps.database;
  }

  public async execute(
    payload: ChangeCentralFactUsecase.Payload,
  ): Promise<CentralFactModel> {
    const { description } = payload;

    const centralFact = await this.getCentralFact.execute();

    try {
      const table = await this.tableGenerator.getTable();

      const json = await this.database.update<CentralFactModel.JSON>(
        table,
        centralFact.id,
        {
          description,
        },
      );

      return CentralFactHydrator.hydrate(json);
    } catch {
      throw new FailedError({
        metadata: { tried: 'change data of central-fact' },
      });
    }
  }
}

export namespace DatabaseChangeCentralFactUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    getCentralFact: GetCentralFactUsecase;
    database: DatabaseProtocol;
  };
}
