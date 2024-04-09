import { WatchDicesUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { FetchDicesObserver } from '@data/observers';

export class DAOWatchDicesUsecase implements WatchDicesUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly fetchDicesPublisher: FetchDicesObserver.Publisher;

  public constructor(deps: DAOWatchDicesUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
    this.fetchDicesPublisher = deps.fetchDicesPublisher;
  }

  public async execute(
    callback: WatchDicesUsecase.Callback,
  ): Promise<WatchDicesUsecase.Response> {
    const unsubscribe = this.diceDAO.watch((dtos) => {
      const dices = dtos.map(DiceHydrator.hydrate);

      this.fetchDicesPublisher.notifyFetchDices(dices);

      callback(dices);
    });

    return unsubscribe;
  }
}

export namespace DAOWatchDicesUsecase {
  export type Deps = {
    diceDAO: IDiceDAO;
    fetchDicesPublisher: FetchDicesObserver.Publisher;
  };
}
