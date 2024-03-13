import { FetchRoundsObserver } from '@data/observers';

import { RoundStoreFetchRoundsSubscriber } from '@main/store';

export function makeRoundStoreFetchRoundsSubscriber(): FetchRoundsObserver.Subscriber {
  return new RoundStoreFetchRoundsSubscriber();
}
