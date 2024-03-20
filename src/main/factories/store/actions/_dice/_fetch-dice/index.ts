import { FetchDiceObserver } from '@data/observers';

import { DiceStoreFetchDiceSubscriber } from '@main/store';

export function makeDiceStoreFetchDiceSubscriber(): FetchDiceObserver.Subscriber {
  return new DiceStoreFetchDiceSubscriber();
}
