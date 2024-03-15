import { SignOutObserver } from '@data/observers';

import { CentralFactStoreSignOutSubscriber } from '@main/store';

export function makeCentralFactStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new CentralFactStoreSignOutSubscriber();
}
