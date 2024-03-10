import { FetchPlayersObserver } from '@data/observers';

import { makePlayerStoreFetchPlayersSubscriber } from '@main/factories';
import { FetchPlayersPublisher } from '@main/observers';

export function makeFetchPlayersPublisher(): FetchPlayersObserver.Publisher {
  const publisher = new FetchPlayersPublisher();

  publisher.subscribe(makePlayerStoreFetchPlayersSubscriber());

  return publisher;
}
