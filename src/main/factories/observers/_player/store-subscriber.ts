import { PlayerObserver } from '@data/observers';

import { StorePlayerSubscriber } from '@main/store';

export function makeStorePlayerSubscriber(): PlayerObserver.Subscriber {
  return new StorePlayerSubscriber();
}
