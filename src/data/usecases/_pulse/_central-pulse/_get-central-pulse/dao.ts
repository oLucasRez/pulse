import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  GetCentralPulseUsecase,
  GetCurrentGameUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { FetchCentralPulseObserver } from '@data/observers';

export class DAOGetCentralPulseUsecase implements GetCentralPulseUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;

  public constructor({
    getCurrentGame,
    centralPulseDAO,
    fetchCentralPulsePublisher,
  }: DAOGetCentralPulseUsecase.Deps) {
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

export namespace DAOGetCentralPulseUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    centralPulseDAO: ICentralPulseDAO;
    fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;
  };
}
