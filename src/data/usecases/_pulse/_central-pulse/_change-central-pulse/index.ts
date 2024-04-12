import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  IChangeCentralPulseUsecase,
  IGetCentralPulseUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { ChangeCentralPulseObserver } from '@data/observers';

export class ChangeCentralPulseUsecase implements IChangeCentralPulseUsecase {
  private readonly getCentralPulse: IGetCentralPulseUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly changeCentralPulsePublisher: ChangeCentralPulseObserver.Publisher;

  public constructor({
    getCentralPulse,
    nextGameState,
    centralPulseDAO,
    changeCentralPulsePublisher,
  }: Deps) {
    this.getCentralPulse = getCentralPulse;
    this.nextGameState = nextGameState;
    this.centralPulseDAO = centralPulseDAO;
    this.changeCentralPulsePublisher = changeCentralPulsePublisher;
  }

  public async execute(
    payload: IChangeCentralPulseUsecase.Payload,
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

    await this.nextGameState.execute();

    return centralPulse;
  }
}

type Deps = {
  getCentralPulse: IGetCentralPulseUsecase;
  nextGameState: INextGameStateUsecase;
  centralPulseDAO: ICentralPulseDAO;
  changeCentralPulsePublisher: ChangeCentralPulseObserver.Publisher;
};
