import { CreateGameObserver } from '@data/observers';
import { CreateGamePublisher } from '@main/observers';

import { makeGameStoreCreateGameSubscriber } from '@main/factories';

export function makeCreateGamePublisher(): CreateGameObserver.Publisher {
  const publisher = new CreateGamePublisher();

  publisher.subscribe(makeGameStoreCreateGameSubscriber());

  return publisher;
}
