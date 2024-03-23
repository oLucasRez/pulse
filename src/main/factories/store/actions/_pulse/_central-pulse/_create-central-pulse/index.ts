import { CreateCentralPulseObserver } from '@data/observers';

import { CentralPulseStoreCreateCentralPulseSubscriber } from '@main/store';

export function makeCentralPulseStoreCreateCentralPulseSubscriber(): CreateCentralPulseObserver.Subscriber {
  return new CentralPulseStoreCreateCentralPulseSubscriber();
}
