import { GameObserver } from '@data/observers';

import { StoreGameSubscriber } from '@main/store';

export function makeStoreGameSubscriber(): GameObserver.Subscriber {
  return new StoreGameSubscriber();
}
