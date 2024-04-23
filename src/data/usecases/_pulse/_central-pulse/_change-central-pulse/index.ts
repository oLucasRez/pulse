import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  IChangeCentralPulseUsecase,
  IGetCentralPulseUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { ICentralPulseHydrator } from '@data/hydration';

export class ChangeCentralPulseUsecase implements IChangeCentralPulseUsecase {
  private readonly getCentralPulse: IGetCentralPulseUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly centralPulseHydrator: ICentralPulseHydrator;
  public constructor({
    getCentralPulse,
    centralPulseDAO,
    centralPulseHydrator,
  }: Deps) {
    this.getCentralPulse = getCentralPulse;
    this.centralPulseDAO = centralPulseDAO;
    this.centralPulseHydrator = centralPulseHydrator;
  }

  public async execute(
    payload: IChangeCentralPulseUsecase.Payload,
  ): Promise<CentralPulseModel> {
    const { amount } = payload;

    let centralPulse = await this.getCentralPulse.execute();

    if (!centralPulse)
      throw new NotFoundError({ metadata: { entity: 'CentralPulse' } });

    if (amount <= centralPulse.amount) {
      return centralPulse;
    }

    const dto = await this.centralPulseDAO.update(centralPulse.id, {
      amount,
    });

    centralPulse = await this.centralPulseHydrator.hydrate(dto);

    return centralPulse;
  }
}

type Deps = {
  getCentralPulse: IGetCentralPulseUsecase;
  centralPulseDAO: ICentralPulseDAO;
  centralPulseHydrator: ICentralPulseHydrator;
};
