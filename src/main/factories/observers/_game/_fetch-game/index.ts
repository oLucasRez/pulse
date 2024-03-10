import { FetchGameObserver } from '@data/observers';
import { FetchGamePublisher } from '@main/observers';

import { makeGameStoreFetchGameSubscriber } from '@main/factories';

export function makeFetchGamePublisher(): FetchGameObserver.Publisher {
  const publisher = new FetchGamePublisher();

  publisher.subscribe(makeGameStoreFetchGameSubscriber());

  return publisher;
}
