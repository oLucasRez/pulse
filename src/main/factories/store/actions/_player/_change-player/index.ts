import { ChangePlayerObserver } from '@data/observers';

import { PlayerStoreChangePlayerSubscriber } from '@main/store';

export function makePlayerStoreChangePlayerSubscriber(): ChangePlayerObserver.Subscriber {
  return new PlayerStoreChangePlayerSubscriber();
}
