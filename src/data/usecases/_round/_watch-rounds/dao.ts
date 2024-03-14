import { WatchRoundsUsecase } from '@domain/usecases';

import { RoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration';
import { FetchRoundsObserver } from '@data/observers';

export class DAOWatchRoundsUsecase implements WatchRoundsUsecase {
  private readonly roundDAO: RoundDAO;
  private readonly fetchRoundsPublisher: FetchRoundsObserver.Publisher;

  public constructor(deps: DAOWatchRoundsUsecase.Deps) {
    this.roundDAO = deps.roundDAO;
    this.fetchRoundsPublisher = deps.fetchRoundsPublisher;
  }

  public async execute(
    callback: WatchRoundsUsecase.Callback,
  ): Promise<WatchRoundsUsecase.Response> {
    const unsubscribe = this.roundDAO.watch((dtos) => {
      const rounds = dtos.map(RoundHydrator.hydrate);

      this.fetchRoundsPublisher.notifyFetchRounds(rounds);

      callback(rounds);
    });

    return unsubscribe;
  }
}

export namespace DAOWatchRoundsUsecase {
  export type Deps = {
    roundDAO: RoundDAO;
    fetchRoundsPublisher: FetchRoundsObserver.Publisher;
  };
}
