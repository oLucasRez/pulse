import { DeletePlayerObserver } from '@data/observers';
import { DeletePlayerPublisher } from '@main/observers';

import { makePlayerStoreDeletePlayerSubscriber } from '@main/factories';

export function makeDeletePlayerPublisher(): DeletePlayerObserver.Publisher {
  const publisher = new DeletePlayerPublisher();

  publisher.subscribe(makePlayerStoreDeletePlayerSubscriber());

  return publisher;
}
