import { FetchDicesObserver } from '@data/observers';

import { makeDiceStoreFetchDicesSubscriber } from '@main/factories';
import { FetchDicesPublisher } from '@main/observers';

export function makeFetchDicesPublisher(): FetchDicesObserver.Publisher {
  const publisher = new FetchDicesPublisher();

  publisher.subscribe(makeDiceStoreFetchDicesSubscriber());

  return publisher;
}
