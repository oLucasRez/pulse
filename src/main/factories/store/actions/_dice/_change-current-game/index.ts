import { ChangeCurrentGameObserver } from '@data/observers';

import { DiceStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeDiceStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new DiceStoreChangeCurrentGameSubscriber();
}
