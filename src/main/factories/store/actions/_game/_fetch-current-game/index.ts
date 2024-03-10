import { FetchCurrentGameObserver } from '@data/observers';

import { GameStoreFetchCurrentGameSubscriber } from '@main/store';

export function makeGameStoreFetchCurrentGameSubscriber(): FetchCurrentGameObserver.Subscriber {
  return new GameStoreFetchCurrentGameSubscriber();
}
