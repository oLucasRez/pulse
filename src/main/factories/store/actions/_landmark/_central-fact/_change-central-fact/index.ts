import { ChangeCentralFactObserver } from '@data/observers';

import { CentralFactStoreChangeCentralFactSubscriber } from '@main/store';

export function makeCentralFactStoreChangeCentralFactSubscriber(): ChangeCentralFactObserver.Subscriber {
  return new CentralFactStoreChangeCentralFactSubscriber();
}
