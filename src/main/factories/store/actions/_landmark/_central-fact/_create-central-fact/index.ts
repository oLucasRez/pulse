import { CreateCentralFactObserver } from '@data/observers';

import { CentralFactStoreCreateCentralFactSubscriber } from '@main/store';

export function makeCentralFactStoreCreateCentralFactSubscriber(): CreateCentralFactObserver.Subscriber {
  return new CentralFactStoreCreateCentralFactSubscriber();
}
