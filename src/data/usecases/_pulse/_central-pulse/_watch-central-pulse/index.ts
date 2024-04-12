import { IWatchCentralPulseUsecase } from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { FetchCentralPulseObserver } from '@data/observers';

export class WatchCentralPulseUsecase implements IWatchCentralPulseUsecase {
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;

  public constructor({ centralPulseDAO, fetchCentralPulsePublisher }: Deps) {
    this.centralPulseDAO = centralPulseDAO;
    this.fetchCentralPulsePublisher = fetchCentralPulsePublisher;
  }

  public async execute(
    callback: IWatchCentralPulseUsecase.Callback,
  ): Promise<IWatchCentralPulseUsecase.Response> {
    const unsubscribe = this.centralPulseDAO.watch(([dto]) => {
      const centralPulse = dto ? CentralPulseHydrator.hydrate(dto) : null;

      this.fetchCentralPulsePublisher.notifyFetchCentralPulse(centralPulse);

      callback(centralPulse);
    });

    return unsubscribe;
  }
}

type Deps = {
  centralPulseDAO: ICentralPulseDAO;
  fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;
};
