import { DiceModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { GetDicesUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseGetDicesUsecase implements GetDicesUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetDicesUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
  }

  public async execute(): Promise<DiceModel[]> {
    try {
      const dices = await this.database.select<DiceModel>(this.table);

      return dices;
    } catch {
      throw new FailedError('Failed to get dices');
    }
  }
}

export namespace DatabaseGetDicesUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
  };
}
