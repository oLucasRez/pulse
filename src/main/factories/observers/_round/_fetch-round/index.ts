import { FetchRoundObserver } from '@data/observers';

import { makeRoundStoreFetchRoundSubscriber } from '@main/factories';
import { FetchRoundPublisher } from '@main/observers';

export function makeFetchRoundPublisher(): FetchRoundObserver.Publisher {
  const publisher = new FetchRoundPublisher();

  publisher.subscribe(makeRoundStoreFetchRoundSubscriber());

  return publisher;
}
