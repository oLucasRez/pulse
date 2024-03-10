import { CreateGameObserver } from '@data/observers';

import { makeGameStoreCreateGameSubscriber } from '@main/factories';
import { CreateGamePublisher } from '@main/observers';

export function makeCreateGamePublisher(): CreateGameObserver.Publisher {
  const publisher = new CreateGamePublisher();

  publisher.subscribe(makeGameStoreCreateGameSubscriber());

  return publisher;
}
