import { DiceModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { GetDicesUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetDicesUsecase implements GetDicesUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetDicesUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<DiceModel[]> {
    try {
      const table = await this.tableGenerator.getTable();

      const dices = await this.database.select<DiceModel>(table);

      return dices;
    } catch {
      throw new FailedError({ metadata: { tried: 'get dices' } });
    }
  }
}

export namespace DatabaseGetDicesUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
