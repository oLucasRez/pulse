import { FetchGameObserver } from '@data/observers';

import { GameStoreFetchGameSubscriber } from '@main/store';

export function makeGameStoreFetchGameSubscriber(): FetchGameObserver.Subscriber {
  return new GameStoreFetchGameSubscriber();
}
