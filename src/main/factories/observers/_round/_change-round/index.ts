import { ChangeRoundObserver } from '@data/observers';

import { makeRoundStoreChangeRoundSubscriber } from '@main/factories';
import { ChangeRoundPublisher } from '@main/observers';

export function makeChangeRoundPublisher(): ChangeRoundObserver.Publisher {
  const publisher = new ChangeRoundPublisher();

  publisher.subscribe(makeRoundStoreChangeRoundSubscriber());

  return publisher;
}
