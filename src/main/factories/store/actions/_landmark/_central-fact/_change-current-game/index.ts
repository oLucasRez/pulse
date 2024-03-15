import { ChangeCurrentGameObserver } from '@data/observers';

import { CentralFactStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeCentralFactStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new CentralFactStoreChangeCurrentGameSubscriber();
}
