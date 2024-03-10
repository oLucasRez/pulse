import { FetchPlayersObserver } from '@data/observers';

import { PlayerStoreFetchPlayersSubscriber } from '@main/store';

export function makePlayerStoreFetchPlayersSubscriber(): FetchPlayersObserver.Subscriber {
  return new PlayerStoreFetchPlayersSubscriber();
}
