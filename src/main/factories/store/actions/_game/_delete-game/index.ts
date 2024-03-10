import { DeleteGameObserver } from '@data/observers';

import { GameStoreDeleteGameSubscriber } from '@main/store';

export function makeGameStoreDeleteGameSubscriber(): DeleteGameObserver.Subscriber {
  return new GameStoreDeleteGameSubscriber();
}
