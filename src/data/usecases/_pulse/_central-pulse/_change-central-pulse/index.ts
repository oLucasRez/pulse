import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  IChangeCentralPulseUsecase,
  IGetCentralPulseUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { ICentralPulseHydrator } from '@data/hydration';

export class ChangeCentralPulseUsecase implements IChangeCentralPulseUsecase {
  private readonly getCentralPulse: IGetCentralPulseUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly centralPulseHydrator: ICentralPulseHydrator;
  public constructor({
    getCentralPulse,
    nextGameState,
    centralPulseDAO,
    centralPulseHydrator,
  }: Deps) {
    this.getCentralPulse = getCentralPulse;
    this.nextGameState = nextGameState;
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
      await this.nextGameState.execute();

      return centralPulse;
    }

    const dto = await this.centralPulseDAO.update(centralPulse.id, {
      amount,
    });

    centralPulse = await this.centralPulseHydrator.hydrate(dto);

    await this.nextGameState.execute();

    return centralPulse;
  }
}

type Deps = {
  getCentralPulse: IGetCentralPulseUsecase;
  nextGameState: INextGameStateUsecase;
  centralPulseDAO: ICentralPulseDAO;
  centralPulseHydrator: ICentralPulseHydrator;
};
