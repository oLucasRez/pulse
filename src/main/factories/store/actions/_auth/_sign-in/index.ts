import { SignInObserver } from '@data/observers';

import { AuthStoreSignInSubscriber } from '@main/store';

export function makeAuthStoreSignInSubscriber(): SignInObserver.Subscriber {
  return new AuthStoreSignInSubscriber();
}
