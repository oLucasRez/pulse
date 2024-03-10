import { SignInObserver } from '@data/observers';

import { makeAuthStoreSignInSubscriber } from '@main/factories';
import { SignInPublisher } from '@main/observers';

export function makeSignInPublisher(): SignInObserver.Publisher {
  const publisher = new SignInPublisher();

  publisher.subscribe(makeAuthStoreSignInSubscriber());

  return publisher;
}
