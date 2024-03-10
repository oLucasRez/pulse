import { DeletePlayerObserver } from '@data/observers';

import { PlayerStoreDeletePlayerSubscriber } from '@main/store';

export function makePlayerStoreDeletePlayerSubscriber(): DeletePlayerObserver.Subscriber {
  return new PlayerStoreDeletePlayerSubscriber();
}
