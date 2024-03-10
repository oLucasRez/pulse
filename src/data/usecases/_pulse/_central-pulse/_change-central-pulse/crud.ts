import { NotFoundError, OutOfBoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  ChangeCentralPulseUsecase,
  GetCentralPulseUsecase,
} from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';

export class DAOChangeCentralPulseUsecase implements ChangeCentralPulseUsecase {
  private readonly getCentralPulse: GetCentralPulseUsecase;
  private readonly centralPulseDAO: CentralPulseDAO;

  public constructor(deps: DAOChangeCentralPulseUsecase.Deps) {
    this.getCentralPulse = deps.getCentralPulse;
    this.centralPulseDAO = deps.centralPulseDAO;
  }

  public async execute(
    payload: ChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel> {
    const { amount } = payload;

    const centralPulse = await this.getCentralPulse.execute();

    if (!centralPulse)
      throw new NotFoundError({ metadata: { entity: 'CentralPulse' } });

    this.amountShouldBeGreaterOrEqual(amount, centralPulse);

    const centralPulseDTO = await this.centralPulseDAO.update(centralPulse.id, {
      amount,
    });

    return CentralPulseHydrator.hydrate(centralPulseDTO);
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

export namespace DAOChangeCentralPulseUsecase {
  export type Deps = {
    getCentralPulse: GetCentralPulseUsecase;
    centralPulseDAO: CentralPulseDAO;
  };
}
