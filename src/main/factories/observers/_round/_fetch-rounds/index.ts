import { FetchRoundsObserver } from '@data/observers';

import { makeRoundStoreFetchRoundsSubscriber } from '@main/factories';
import { FetchRoundsPublisher } from '@main/observers';

export function makeFetchRoundsPublisher(): FetchRoundsObserver.Publisher {
  const publisher = new FetchRoundsPublisher();

  publisher.subscribe(makeRoundStoreFetchRoundsSubscriber());

  return publisher;
}
