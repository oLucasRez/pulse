import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  IGetCentralPulseUsecase,
  IGetCurrentGameUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { FetchCentralPulseObserver } from '@data/observers';

export class GetCentralPulseUsecase implements IGetCentralPulseUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;

  public constructor({
    getCurrentGame,
    centralPulseDAO,
    fetchCentralPulsePublisher,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.centralPulseDAO = centralPulseDAO;
    this.fetchCentralPulsePublisher = fetchCentralPulsePublisher;
  }

  public async execute(): Promise<CentralPulseModel | null> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (!currentGame.centralPulseID) return null;

    const dto = await this.centralPulseDAO.getByID(currentGame.centralPulseID);

    const centralPulse = dto ? CentralPulseHydrator.hydrate(dto) : null;

    this.fetchCentralPulsePublisher.notifyFetchCentralPulse(centralPulse);

    return centralPulse;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  centralPulseDAO: ICentralPulseDAO;
  fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;
};
