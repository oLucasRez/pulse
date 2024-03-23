import { ChangeCurrentGameObserver } from '@data/observers';

import { CentralPulseStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeCentralPulseStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new CentralPulseStoreChangeCurrentGameSubscriber();
}
