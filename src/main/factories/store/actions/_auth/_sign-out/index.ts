import { SignOutObserver } from '@data/observers';

import { AuthStoreSignOutSubscriber } from '@main/store';

export function makeAuthStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new AuthStoreSignOutSubscriber();
}
