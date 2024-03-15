import { WatchCentralFactUsecase } from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { FetchCentralFactObserver } from '@data/observers';

export class DAOWatchCentralFactUsecase implements WatchCentralFactUsecase {
  private readonly centralFactDAO: CentralFactDAO;
  private readonly fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;

  public constructor(deps: DAOWatchCentralFactUsecase.Deps) {
    this.centralFactDAO = deps.centralFactDAO;
    this.fetchCentralFactPublisher = deps.fetchCentralFactPublisher;
  }

  public async execute(
    callback: WatchCentralFactUsecase.Callback,
  ): Promise<WatchCentralFactUsecase.Response> {
    const unsubscribe = this.centralFactDAO.watch(([dto]) => {
      const centralFact = dto ? CentralFactHydrator.hydrate(dto) : null;

      this.fetchCentralFactPublisher.notifyFetchCentralFact(centralFact);

      callback(centralFact);
    });

    return unsubscribe;
  }
}

export namespace DAOWatchCentralFactUsecase {
  export type Deps = {
    centralFactDAO: CentralFactDAO;
    fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;
  };
}
