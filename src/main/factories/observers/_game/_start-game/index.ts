import { StartGameObserver } from '@data/observers';

import { makeGameStoreStartGameSubscriber } from '@main/factories';
import { StartGamePublisher } from '@main/observers';

export function makeStartGamePublisher(): StartGameObserver.Publisher {
  const publisher = new StartGamePublisher();

  publisher.subscribe(makeGameStoreStartGameSubscriber());

  return publisher;
}
