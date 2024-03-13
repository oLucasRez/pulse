import { FetchRoundObserver } from '@data/observers';

import { RoundStoreFetchRoundSubscriber } from '@main/store';

export function makeRoundStoreFetchRoundSubscriber(): FetchRoundObserver.Subscriber {
  return new RoundStoreFetchRoundSubscriber();
}
