import { ChangeGameObserver } from '@data/observers';
import { ChangeGamePublisher } from '@main/observers';

import { makeGameStoreChangeGameSubscriber } from '@main/factories';

export function makeChangeGamePublisher(): ChangeGameObserver.Publisher {
  const publisher = new ChangeGamePublisher();

  publisher.subscribe(makeGameStoreChangeGameSubscriber());

  return publisher;
}
