import { WatchCentralPulseUsecase } from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { FetchCentralPulseObserver } from '@data/observers';

export class DAOWatchCentralPulseUsecase implements WatchCentralPulseUsecase {
  private readonly centralPulseDAO: CentralPulseDAO;
  private readonly fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;

  public constructor(deps: DAOWatchCentralPulseUsecase.Deps) {
    this.centralPulseDAO = deps.centralPulseDAO;
    this.fetchCentralPulsePublisher = deps.fetchCentralPulsePublisher;
  }

  public async execute(
    callback: WatchCentralPulseUsecase.Callback,
  ): Promise<WatchCentralPulseUsecase.Response> {
    const unsubscribe = this.centralPulseDAO.watch(([dto]) => {
      const centralPulse = dto ? CentralPulseHydrator.hydrate(dto) : null;

      this.fetchCentralPulsePublisher.notifyFetchCentralPulse(centralPulse);

      callback(centralPulse);
    });

    return unsubscribe;
  }
}

export namespace DAOWatchCentralPulseUsecase {
  export type Deps = {
    centralPulseDAO: CentralPulseDAO;
    fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;
  };
}
