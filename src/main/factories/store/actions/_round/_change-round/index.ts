import { ChangeRoundObserver } from '@data/observers';

import { RoundStoreChangeRoundSubscriber } from '@main/store';

export function makeRoundStoreChangeRoundSubscriber(): ChangeRoundObserver.Subscriber {
  return new RoundStoreChangeRoundSubscriber();
}
