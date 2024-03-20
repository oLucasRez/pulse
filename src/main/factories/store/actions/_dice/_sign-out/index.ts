import { SignOutObserver } from '@data/observers';

import { DiceStoreSignOutSubscriber } from '@main/store';

export function makeDiceStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new DiceStoreSignOutSubscriber();
}
