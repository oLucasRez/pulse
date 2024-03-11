import { ChangeCurrentGameObserver } from '@data/observers';

import { AuthStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeAuthStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new AuthStoreChangeCurrentGameSubscriber();
}
