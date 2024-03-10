import { FetchGamesObserver } from '@data/observers';

import { GameStoreFetchGamesSubscriber } from '@main/store';

export function makeGameStoreFetchGamesSubscriber(): FetchGamesObserver.Subscriber {
  return new GameStoreFetchGamesSubscriber();
}
