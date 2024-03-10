import { SignOutObserver } from '@data/observers';

import { GameStoreSignOutSubscriber } from '@main/store';

export function makeGameStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new GameStoreSignOutSubscriber();
}
