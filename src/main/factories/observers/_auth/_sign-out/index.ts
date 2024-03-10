import { SignOutObserver } from '@data/observers';

import {
  makeAuthStoreSignOutSubscriber,
  makeGameStoreSignOutSubscriber,
  makePlayerStoreSignOutSubscriber,
} from '@main/factories';
import { SignOutPublisher } from '@main/observers';

export function makeSignOutPublisher(): SignOutObserver.Publisher {
  const publisher = new SignOutPublisher();

  publisher.subscribe(makeAuthStoreSignOutSubscriber());
  publisher.subscribe(makeGameStoreSignOutSubscriber());
  publisher.subscribe(makePlayerStoreSignOutSubscriber());

  return publisher;
}
