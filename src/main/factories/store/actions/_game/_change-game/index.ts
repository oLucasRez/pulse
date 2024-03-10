import { ChangeGameObserver } from '@data/observers';

import { GameStoreChangeGameSubscriber } from '@main/store';

export function makeGameStoreChangeGameSubscriber(): ChangeGameObserver.Subscriber {
  return new GameStoreChangeGameSubscriber();
}
