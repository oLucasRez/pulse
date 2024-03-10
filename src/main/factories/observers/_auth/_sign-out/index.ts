import { SignOutObserver } from '@data/observers';
import { SignOutPublisher } from '@main/observers';

import { makeStoreSignOutSubscriber } from '@main/factories';

export function makeSignOutPublisher(): SignOutObserver.Publisher {
  const publisher = new SignOutPublisher();

  publisher.subscribe(makeStoreSignOutSubscriber());

  return publisher;
}
