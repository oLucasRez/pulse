import { DeletePlayerObserver } from '@data/observers';

import { makePlayerStoreDeletePlayerSubscriber } from '@main/factories';
import { DeletePlayerPublisher } from '@main/observers';

export function makeDeletePlayerPublisher(): DeletePlayerObserver.Publisher {
  const publisher = new DeletePlayerPublisher();

  publisher.subscribe(makePlayerStoreDeletePlayerSubscriber());

  return publisher;
}
