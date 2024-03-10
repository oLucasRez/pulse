import { ChangeGameObserver } from '@data/observers';

import { makeGameStoreChangeGameSubscriber } from '@main/factories';
import { ChangeGamePublisher } from '@main/observers';

export function makeChangeGamePublisher(): ChangeGameObserver.Publisher {
  const publisher = new ChangeGamePublisher();

  publisher.subscribe(makeGameStoreChangeGameSubscriber());

  return publisher;
}
