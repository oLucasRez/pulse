import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  ChangeCentralPulseUsecase,
  GetCentralPulseUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { ChangeCentralPulseObserver } from '@data/observers';

export class DAOChangeCentralPulseUsecase implements ChangeCentralPulseUsecase {
  private readonly getCentralPulse: GetCentralPulseUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly changeCentralPulsePublisher: ChangeCentralPulseObserver.Publisher;

  public constructor(deps: DAOChangeCentralPulseUsecase.Deps) {
    this.getCentralPulse = deps.getCentralPulse;
    this.centralPulseDAO = deps.centralPulseDAO;
    this.changeCentralPulsePublisher = deps.changeCentralPulsePublisher;
  }

  public async execute(
    payload: ChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel> {
    const { amount } = payload;

    let centralPulse = await this.getCentralPulse.execute();

    if (!centralPulse)
      throw new NotFoundError({ metadata: { entity: 'CentralPulse' } });

    if (amount <= centralPulse.amount) return centralPulse;

    const dto = await this.centralPulseDAO.update(centralPulse.id, {
      amount,
    });

    centralPulse = CentralPulseHydrator.hydrate(dto);

    this.changeCentralPulsePublisher.notifyChangeCentralPulse(centralPulse);

    return centralPulse;
  }
}

export namespace DAOChangeCentralPulseUsecase {
  export type Deps = {
    getCentralPulse: GetCentralPulseUsecase;
    centralPulseDAO: ICentralPulseDAO;
    changeCentralPulsePublisher: ChangeCentralPulseObserver.Publisher;
  };
}
