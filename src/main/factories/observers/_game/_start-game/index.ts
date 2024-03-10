import { StartGameObserver } from '@data/observers';
import { StartGamePublisher } from '@main/observers';

import { makeGameStoreStartGameSubscriber } from '@main/factories';

export function makeStartGamePublisher(): StartGameObserver.Publisher {
  const publisher = new StartGamePublisher();

  publisher.subscribe(makeGameStoreStartGameSubscriber());

  return publisher;
}
