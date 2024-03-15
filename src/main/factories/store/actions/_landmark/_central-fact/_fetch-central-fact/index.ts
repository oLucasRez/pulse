import { FetchCentralFactObserver } from '@data/observers';

import { CentralFactStoreFetchCentralFactSubscriber } from '@main/store';

export function makeCentralFactStoreFetchCentralFactSubscriber(): FetchCentralFactObserver.Subscriber {
  return new CentralFactStoreFetchCentralFactSubscriber();
}
