import { FetchCurrentGameObserver } from '@data/observers';
import { FetchCurrentGamePublisher } from '@main/observers';

import { makeGameStoreFetchCurrentGameSubscriber } from '@main/factories';

export function makeFetchCurrentGamePublisher(): FetchCurrentGameObserver.Publisher {
  const publisher = new FetchCurrentGamePublisher();

  publisher.subscribe(makeGameStoreFetchCurrentGameSubscriber());

  return publisher;
}
