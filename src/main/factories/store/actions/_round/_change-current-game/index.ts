import { ChangeCurrentGameObserver } from '@data/observers';

import { RoundStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeRoundStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new RoundStoreChangeCurrentGameSubscriber();
}
