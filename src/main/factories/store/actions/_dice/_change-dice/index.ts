import { ChangeDiceObserver } from '@data/observers';

import { DiceStoreChangeDiceSubscriber } from '@main/store';

export function makeDiceStoreChangeDiceSubscriber(): ChangeDiceObserver.Subscriber {
  return new DiceStoreChangeDiceSubscriber();
}
