import { FetchDicesObserver } from '@data/observers';

import { DiceStoreFetchDicesSubscriber } from '@main/store';

export function makeDiceStoreFetchDicesSubscriber(): FetchDicesObserver.Subscriber {
  return new DiceStoreFetchDicesSubscriber();
}
