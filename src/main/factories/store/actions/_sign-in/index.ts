import { SignInObserver } from '@data/observers';

import { AuthStoreSignInSubscriber } from '@main/store';

export function makeStoreSignInSubscriber(): SignInObserver.Subscriber {
  return new AuthStoreSignInSubscriber();
}
