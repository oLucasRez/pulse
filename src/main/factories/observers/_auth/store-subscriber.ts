import { AuthObserver } from '@data/observers';

import { StoreAuthSubscriber } from '@main/store';

export function makeStoreAuthSubscriber(): AuthObserver.Subscriber {
  return new StoreAuthSubscriber();
}
