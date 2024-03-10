import { DeleteGameObserver } from '@data/observers';
import { DeleteGamePublisher } from '@main/observers';

import { makeGameStoreDeleteGameSubscriber } from '@main/factories';

export function makeDeleteGamePublisher(): DeleteGameObserver.Publisher {
  const publisher = new DeleteGamePublisher();

  publisher.subscribe(makeGameStoreDeleteGameSubscriber());

  return publisher;
}
