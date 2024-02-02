import { CentralFactModel } from '@domain/models';

import { FailedError } from '@domain/errors';

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

    let centralFact = await this.getCentralFact.execute();

    try {
      const table = await this.tableGenerator.getTable();

      centralFact = await this.database.update<CentralFactModel>(
        table,
        centralFact.id,
        {
          description,
        },
      );

      return centralFact;
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
