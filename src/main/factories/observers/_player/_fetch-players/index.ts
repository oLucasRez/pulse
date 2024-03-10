import { FetchPlayersObserver } from '@data/observers';
import { FetchPlayersPublisher } from '@main/observers';

import { makePlayerStoreFetchPlayersSubscriber } from '@main/factories';

export function makeFetchPlayersPublisher(): FetchPlayersObserver.Publisher {
  const publisher = new FetchPlayersPublisher();

  publisher.subscribe(makePlayerStoreFetchPlayersSubscriber());

  return publisher;
}
