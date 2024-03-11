import { ChangeCurrentGameObserver } from '@data/observers';

import { PlayerStoreChangeCurrentGameSubscriber } from '@main/store';

export function makePlayerStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new PlayerStoreChangeCurrentGameSubscriber();
}
