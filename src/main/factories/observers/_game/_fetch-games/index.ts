import { FetchGamesObserver } from '@data/observers';

import { makeGameStoreFetchGamesSubscriber } from '@main/factories';
import { FetchGamesPublisher } from '@main/observers';

export function makeFetchGamesPublisher(): FetchGamesObserver.Publisher {
  const publisher = new FetchGamesPublisher();

  publisher.subscribe(makeGameStoreFetchGamesSubscriber());

  return publisher;
}
