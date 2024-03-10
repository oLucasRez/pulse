import { CreatePlayerObserver } from '@data/observers';

import { PlayerStoreCreatePlayerSubscriber } from '@main/store';

export function makePlayerStoreCreatePlayerSubscriber(): CreatePlayerObserver.Subscriber {
  return new PlayerStoreCreatePlayerSubscriber();
}
