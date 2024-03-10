import { ChangeMeObserver } from '@data/observers';

import { AuthStoreChangeMeSubscriber } from '@main/store';

export function makeStoreChangeMeSubscriber(): ChangeMeObserver.Subscriber {
  return new AuthStoreChangeMeSubscriber();
}
