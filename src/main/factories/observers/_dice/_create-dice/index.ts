import { CreateDiceObserver } from '@data/observers';

import { makeDiceStoreCreateDiceSubscriber } from '@main/factories';
import { CreateDicePublisher } from '@main/observers';

export function makeCreateDicePublisher(): CreateDiceObserver.Publisher {
  const publisher = new CreateDicePublisher();

  publisher.subscribe(makeDiceStoreCreateDiceSubscriber());

  return publisher;
}
