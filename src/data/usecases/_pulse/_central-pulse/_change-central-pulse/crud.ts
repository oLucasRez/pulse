import { CentralPulseModel } from '@domain/models';

import { NotFoundError, OutOfBoundError } from '@domain/errors';

import { CentralPulseHydrator } from '@data/hydration';

import {
  ChangeCentralPulseUsecase,
  GetCentralPulseUsecase,
} from '@domain/usecases';

import { CentralPulseCRUD } from '@data/cruds';

export class CRUDChangeCentralPulseUsecase
  implements ChangeCentralPulseUsecase
{
  private readonly getCentralPulse: GetCentralPulseUsecase;
  private readonly centralPulseCRUD: CentralPulseCRUD;

  public constructor(deps: CRUDChangeCentralPulseUsecase.Deps) {
    this.getCentralPulse = deps.getCentralPulse;
    this.centralPulseCRUD = deps.centralPulseCRUD;
  }

  public async execute(
    payload: ChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel> {
    const { amount } = payload;

    const centralPulse = await this.getCentralPulse.execute();

    if (!centralPulse)
      throw new NotFoundError({ metadata: { entity: 'CentralPulse' } });

    this.amountShouldBeGreaterOrEqual(amount, centralPulse);

    const centralPulseDTO = await this.centralPulseCRUD.update(
      centralPulse.id,
      {
        amount,
      },
    );

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

export namespace CRUDChangeCentralPulseUsecase {
  export type Deps = {
    getCentralPulse: GetCentralPulseUsecase;
    centralPulseCRUD: CentralPulseCRUD;
  };
}
