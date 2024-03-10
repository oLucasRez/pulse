import { FetchGamesObserver } from '@data/observers';
import { FetchGamesPublisher } from '@main/observers';

import { makeGameStoreFetchGamesSubscriber } from '@main/factories';

export function makeFetchGamesPublisher(): FetchGamesObserver.Publisher {
  const publisher = new FetchGamesPublisher();

  publisher.subscribe(makeGameStoreFetchGamesSubscriber());

  return publisher;
}
