import { ChangeCurrentGameObserver } from '@data/observers';

import { GameStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeGameStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new GameStoreChangeCurrentGameSubscriber();
}
