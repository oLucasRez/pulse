import { ChangeCentralPulseObserver } from '@data/observers';

import { CentralPulseStoreChangeCentralPulseSubscriber } from '@main/store';

export function makeCentralPulseStoreChangeCentralPulseSubscriber(): ChangeCentralPulseObserver.Subscriber {
  return new CentralPulseStoreChangeCentralPulseSubscriber();
}
