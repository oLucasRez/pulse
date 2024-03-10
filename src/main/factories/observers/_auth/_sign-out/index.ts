import { SignOutObserver } from '@data/observers';
import { SignOutPublisher } from '@main/observers';

import {
  makeAuthStoreSignOutSubscriber,
  makeGameStoreSignOutSubscriber,
  makePlayerStoreSignOutSubscriber,
} from '@main/factories';

export function makeSignOutPublisher(): SignOutObserver.Publisher {
  const publisher = new SignOutPublisher();

  publisher.subscribe(makeAuthStoreSignOutSubscriber());
  publisher.subscribe(makeGameStoreSignOutSubscriber());
  publisher.subscribe(makePlayerStoreSignOutSubscriber());

  return publisher;
}
