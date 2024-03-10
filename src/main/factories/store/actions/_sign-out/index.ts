import { SignOutObserver } from '@data/observers';

import { AuthStoreSignOutSubscriber } from '@main/store';

export function makeStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new AuthStoreSignOutSubscriber();
}
