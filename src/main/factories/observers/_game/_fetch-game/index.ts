import { FetchGameObserver } from '@data/observers';

import { makeGameStoreFetchGameSubscriber } from '@main/factories';
import { FetchGamePublisher } from '@main/observers';

export function makeFetchGamePublisher(): FetchGameObserver.Publisher {
  const publisher = new FetchGamePublisher();

  publisher.subscribe(makeGameStoreFetchGameSubscriber());

  return publisher;
}
