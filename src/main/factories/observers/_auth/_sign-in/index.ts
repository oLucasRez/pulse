import { SignInObserver } from '@data/observers';
import { SignInPublisher } from '@main/observers';

import { makeAuthStoreSignInSubscriber } from '@main/factories';

export function makeSignInPublisher(): SignInObserver.Publisher {
  const publisher = new SignInPublisher();

  publisher.subscribe(makeAuthStoreSignInSubscriber());

  return publisher;
}
