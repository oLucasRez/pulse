import { CreateRoundObserver } from '@data/observers';

import { makeRoundStoreCreateRoundSubscriber } from '@main/factories';
import { CreateRoundPublisher } from '@main/observers';

export function makeCreateRoundPublisher(): CreateRoundObserver.Publisher {
  const publisher = new CreateRoundPublisher();

  publisher.subscribe(makeRoundStoreCreateRoundSubscriber());

  return publisher;
}
