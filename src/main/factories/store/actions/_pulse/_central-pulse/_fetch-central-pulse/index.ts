import { FetchCentralPulseObserver } from '@data/observers';

import { CentralPulseStoreFetchCentralPulseSubscriber } from '@main/store';

export function makeCentralPulseStoreFetchCentralPulseSubscriber(): FetchCentralPulseObserver.Subscriber {
  return new CentralPulseStoreFetchCentralPulseSubscriber();
}
