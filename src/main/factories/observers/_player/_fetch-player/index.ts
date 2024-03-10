import { FetchPlayerObserver } from '@data/observers';

import { makePlayerStoreFetchPlayerSubscriber } from '@main/factories';
import { FetchPlayerPublisher } from '@main/observers';

export function makeFetchPlayerPublisher(): FetchPlayerObserver.Publisher {
  const publisher = new FetchPlayerPublisher();

  publisher.subscribe(makePlayerStoreFetchPlayerSubscriber());

  return publisher;
}
