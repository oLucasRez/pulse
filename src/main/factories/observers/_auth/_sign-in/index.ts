import { SignInObserver } from '@data/observers';
import { SignInPublisher } from '@main/observers';

import { makeStoreSignInSubscriber } from '@main/factories';

export function makeSignInPublisher(): SignInObserver.Publisher {
  const publisher = new SignInPublisher();

  publisher.subscribe(makeStoreSignInSubscriber());

  return publisher;
}
