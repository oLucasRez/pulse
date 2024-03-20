import { FetchDiceObserver } from '@data/observers';

import { makeDiceStoreFetchDiceSubscriber } from '@main/factories';
import { FetchDicePublisher } from '@main/observers';

export function makeFetchDicePublisher(): FetchDiceObserver.Publisher {
  const publisher = new FetchDicePublisher();

  publisher.subscribe(makeDiceStoreFetchDiceSubscriber());

  return publisher;
}
