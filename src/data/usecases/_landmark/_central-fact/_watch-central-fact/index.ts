import { IWatchCentralFactUsecase } from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { FetchCentralFactObserver } from '@data/observers';

export class WatchCentralFactUsecase implements IWatchCentralFactUsecase {
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;

  public constructor({ centralFactDAO, fetchCentralFactPublisher }: Deps) {
    this.centralFactDAO = centralFactDAO;
    this.fetchCentralFactPublisher = fetchCentralFactPublisher;
  }

  public async execute(
    callback: IWatchCentralFactUsecase.Callback,
  ): Promise<IWatchCentralFactUsecase.Response> {
    const unsubscribe = this.centralFactDAO.watch(([dto]) => {
      const centralFact = dto ? CentralFactHydrator.hydrate(dto) : null;

      this.fetchCentralFactPublisher.notifyFetchCentralFact(centralFact);

      callback(centralFact);
    });

    return unsubscribe;
  }
}

type Deps = {
  centralFactDAO: ICentralFactDAO;
  fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;
};
