import { SignOutObserver } from '@data/observers';

import { RoundStoreSignOutSubscriber } from '@main/store';

export function makeRoundStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new RoundStoreSignOutSubscriber();
}
