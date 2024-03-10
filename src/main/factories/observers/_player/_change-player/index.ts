import { ChangePlayerObserver } from '@data/observers';

import { makePlayerStoreChangePlayerSubscriber } from '@main/factories';
import { ChangePlayerPublisher } from '@main/observers';

export function makeChangePlayerPublisher(): ChangePlayerObserver.Publisher {
  const publisher = new ChangePlayerPublisher();

  publisher.subscribe(makePlayerStoreChangePlayerSubscriber());

  return publisher;
}
