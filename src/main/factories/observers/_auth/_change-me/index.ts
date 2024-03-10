import { ChangeMeObserver } from '@data/observers';

import { makeAuthStoreChangeMeSubscriber } from '@main/factories';
import { ChangeMePublisher } from '@main/observers';

export function makeChangeMePublisher(): ChangeMeObserver.Publisher {
  const publisher = new ChangeMePublisher();

  publisher.subscribe(makeAuthStoreChangeMeSubscriber());

  return publisher;
}
