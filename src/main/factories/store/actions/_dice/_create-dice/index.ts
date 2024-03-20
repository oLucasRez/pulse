import { CreateDiceObserver } from '@data/observers';

import { DiceStoreCreateDiceSubscriber } from '@main/store';

export function makeDiceStoreCreateDiceSubscriber(): CreateDiceObserver.Subscriber {
  return new DiceStoreCreateDiceSubscriber();
}
