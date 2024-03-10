import { SignOutObserver } from '@data/observers';

import { PlayerStoreSignOutSubscriber } from '@main/store';

export function makePlayerStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new PlayerStoreSignOutSubscriber();
}
