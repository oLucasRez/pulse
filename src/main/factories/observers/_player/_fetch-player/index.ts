import { FetchPlayerObserver } from '@data/observers';
import { FetchPlayerPublisher } from '@main/observers';

import { makePlayerStoreFetchPlayerSubscriber } from '@main/factories';

export function makeFetchPlayerPublisher(): FetchPlayerObserver.Publisher {
  const publisher = new FetchPlayerPublisher();

  publisher.subscribe(makePlayerStoreFetchPlayerSubscriber());

  return publisher;
}
