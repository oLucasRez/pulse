import { ChangeMeObserver } from '@data/observers';
import { ChangeMePublisher } from '@main/observers';

import { makeAuthStoreChangeMeSubscriber } from '@main/factories';

export function makeChangeMePublisher(): ChangeMeObserver.Publisher {
  const publisher = new ChangeMePublisher();

  publisher.subscribe(makeAuthStoreChangeMeSubscriber());

  return publisher;
}
