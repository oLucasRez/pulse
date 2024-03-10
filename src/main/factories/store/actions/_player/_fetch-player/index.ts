import { FetchPlayerObserver } from '@data/observers';

import { PlayerStoreFetchPlayerSubscriber } from '@main/store';

export function makePlayerStoreFetchPlayerSubscriber(): FetchPlayerObserver.Subscriber {
  return new PlayerStoreFetchPlayerSubscriber();
}
