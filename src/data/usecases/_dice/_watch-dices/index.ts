import { IWatchDicesUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { FetchDicesObserver } from '@data/observers';

export class WatchDicesUsecase implements IWatchDicesUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly fetchDicesPublisher: FetchDicesObserver.Publisher;

  public constructor({ diceDAO, fetchDicesPublisher }: Deps) {
    this.diceDAO = diceDAO;
    this.fetchDicesPublisher = fetchDicesPublisher;
  }

  public async execute(
    callback: IWatchDicesUsecase.Callback,
  ): Promise<IWatchDicesUsecase.Response> {
    const unsubscribe = this.diceDAO.watch((dtos) => {
      const dices = dtos.map(DiceHydrator.hydrate);

      this.fetchDicesPublisher.notifyFetchDices(dices);

      callback(dices);
    });

    return unsubscribe;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  fetchDicesPublisher: FetchDicesObserver.Publisher;
};
