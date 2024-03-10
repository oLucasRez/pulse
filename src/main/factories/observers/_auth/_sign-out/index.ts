import { SignOutObserver } from '@data/observers';
import { SignOutPublisher } from '@main/observers';

import { makeAuthStoreSignOutSubscriber } from '@main/factories';

export function makeSignOutPublisher(): SignOutObserver.Publisher {
  const publisher = new SignOutPublisher();

  publisher.subscribe(makeAuthStoreSignOutSubscriber());

  return publisher;
}
