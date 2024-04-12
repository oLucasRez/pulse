import { IWatchRoundsUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration';
import { FetchRoundsObserver } from '@data/observers';

export class WatchRoundsUsecase implements IWatchRoundsUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly fetchRoundsPublisher: FetchRoundsObserver.Publisher;

  public constructor({ roundDAO, fetchRoundsPublisher }: Deps) {
    this.roundDAO = roundDAO;
    this.fetchRoundsPublisher = fetchRoundsPublisher;
  }

  public async execute(
    callback: IWatchRoundsUsecase.Callback,
  ): Promise<IWatchRoundsUsecase.Response> {
    const unsubscribe = this.roundDAO.watch((dtos) => {
      const rounds = dtos.map(RoundHydrator.hydrate);

      this.fetchRoundsPublisher.notifyFetchRounds(rounds);

      callback(rounds);
    });

    return unsubscribe;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  fetchRoundsPublisher: FetchRoundsObserver.Publisher;
};
