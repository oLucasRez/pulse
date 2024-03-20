import { ChangeDiceObserver } from '@data/observers';

import { makeDiceStoreChangeDiceSubscriber } from '@main/factories';
import { ChangeDicePublisher } from '@main/observers';

export function makeChangeDicePublisher(): ChangeDiceObserver.Publisher {
  const publisher = new ChangeDicePublisher();

  publisher.subscribe(makeDiceStoreChangeDiceSubscriber());

  return publisher;
}
