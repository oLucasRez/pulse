import { CreatePlayerObserver } from '@data/observers';

import { makePlayerStoreCreatePlayerSubscriber } from '@main/factories';
import { CreatePlayerPublisher } from '@main/observers';

export function makeCreatePlayerPublisher(): CreatePlayerObserver.Publisher {
  const publisher = new CreatePlayerPublisher();

  publisher.subscribe(makePlayerStoreCreatePlayerSubscriber());

  return publisher;
}
