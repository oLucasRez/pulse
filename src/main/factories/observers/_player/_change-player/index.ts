import { ChangePlayerObserver } from '@data/observers';
import { ChangePlayerPublisher } from '@main/observers';

import { makePlayerStoreChangePlayerSubscriber } from '@main/factories';

export function makeChangePlayerPublisher(): ChangePlayerObserver.Publisher {
  const publisher = new ChangePlayerPublisher();

  publisher.subscribe(makePlayerStoreChangePlayerSubscriber());

  return publisher;
}
