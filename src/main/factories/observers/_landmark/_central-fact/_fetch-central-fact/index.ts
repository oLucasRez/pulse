import { FetchCentralFactObserver } from '@data/observers';

import { makeCentralFactStoreFetchCentralFactSubscriber } from '@main/factories';
import { FetchCentralFactPublisher } from '@main/observers';

export function makeFetchCentralFactPublisher(): FetchCentralFactObserver.Publisher {
  const publisher = new FetchCentralFactPublisher();

  publisher.subscribe(makeCentralFactStoreFetchCentralFactSubscriber());

  return publisher;
}
