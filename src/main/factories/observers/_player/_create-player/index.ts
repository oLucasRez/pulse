import { CreatePlayerObserver } from '@data/observers';
import { CreatePlayerPublisher } from '@main/observers';

import { makePlayerStoreCreatePlayerSubscriber } from '@main/factories';

export function makeCreatePlayerPublisher(): CreatePlayerObserver.Publisher {
  const publisher = new CreatePlayerPublisher();

  publisher.subscribe(makePlayerStoreCreatePlayerSubscriber());

  return publisher;
}
