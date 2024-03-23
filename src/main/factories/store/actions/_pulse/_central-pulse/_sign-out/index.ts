import { SignOutObserver } from '@data/observers';

import { CentralPulseStoreSignOutSubscriber } from '@main/store';

export function makeCentralPulseStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new CentralPulseStoreSignOutSubscriber();
}
