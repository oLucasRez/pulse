import { FetchCurrentGameObserver } from '@data/observers';

import { makeGameStoreFetchCurrentGameSubscriber } from '@main/factories';
import { FetchCurrentGamePublisher } from '@main/observers';

export function makeFetchCurrentGamePublisher(): FetchCurrentGameObserver.Publisher {
  const publisher = new FetchCurrentGamePublisher();

  publisher.subscribe(makeGameStoreFetchCurrentGameSubscriber());

  return publisher;
}
