import { DeleteGameObserver } from '@data/observers';

import { makeGameStoreDeleteGameSubscriber } from '@main/factories';
import { DeleteGamePublisher } from '@main/observers';

export function makeDeleteGamePublisher(): DeleteGameObserver.Publisher {
  const publisher = new DeleteGamePublisher();

  publisher.subscribe(makeGameStoreDeleteGameSubscriber());

  return publisher;
}
