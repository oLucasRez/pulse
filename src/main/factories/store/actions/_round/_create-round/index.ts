import { CreateRoundObserver } from '@data/observers';

import { RoundStoreCreateRoundSubscriber } from '@main/store';

export function makeRoundStoreCreateRoundSubscriber(): CreateRoundObserver.Subscriber {
  return new RoundStoreCreateRoundSubscriber();
}
