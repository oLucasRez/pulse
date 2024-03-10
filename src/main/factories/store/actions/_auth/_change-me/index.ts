import { ChangeMeObserver } from '@data/observers';

import { AuthStoreChangeMeSubscriber } from '@main/store';

export function makeAuthStoreChangeMeSubscriber(): ChangeMeObserver.Subscriber {
  return new AuthStoreChangeMeSubscriber();
}
