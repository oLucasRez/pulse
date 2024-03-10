import { BanPlayerObserver } from '@data/observers';

import { PlayerStoreBanPlayerSubscriber } from '@main/store';

export function makePlayerStoreBanPlayerSubscriber(): BanPlayerObserver.Subscriber {
  return new PlayerStoreBanPlayerSubscriber();
}
