import { CentralPulseModel } from '@domain/models';

import { FailedError, OutOfBoundError } from '@domain/errors';

import {
  ChangeCentralPulseUsecase,
  GetCentralPulseUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeCentralPulseUsecase
  implements ChangeCentralPulseUsecase
{
  private readonly tableGenerator: TableGenerator;
  private readonly getCentralPulse: GetCentralPulseUsecase;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseChangeCentralPulseUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.getCentralPulse = deps.getCentralPulse;
    this.database = deps.database;
  }

  public async execute(
    payload: ChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel> {
    const { amount } = payload;

    let centralPulse = await this.getCentralPulse.execute();

    this.amountShouldBeGreaterOrEqual(amount, centralPulse);

    try {
      const table = await this.tableGenerator.getTable();

      centralPulse = await this.database.update<CentralPulseModel>(
        table,
        centralPulse.id,
        {
          amount,
        },
      );

      return centralPulse;
    } catch {
      throw new FailedError({
        metadata: { tried: 'change data of central-pulse' },
      });
    }
  }

  private amountShouldBeGreaterOrEqual(
    amount: number,
    centralPulse: CentralPulseModel,
  ): void {
    if (amount < centralPulse.amount)
      throw new OutOfBoundError({
        metadata: {
          prop: 'amount',
          value: amount,
          bound: 'below',
          limit: centralPulse.amount,
        },
      });
  }
}

export namespace DatabaseChangeCentralPulseUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    getCentralPulse: GetCentralPulseUsecase;
    database: DatabaseProtocol;
  };
}
