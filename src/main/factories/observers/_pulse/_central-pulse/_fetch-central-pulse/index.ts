import { FetchCentralPulseObserver } from '@data/observers';

import { makeCentralPulseStoreFetchCentralPulseSubscriber } from '@main/factories';
import { FetchCentralPulsePublisher } from '@main/observers';

export function makeFetchCentralPulsePublisher(): FetchCentralPulseObserver.Publisher {
  const publisher = new FetchCentralPulsePublisher();

  publisher.subscribe(makeCentralPulseStoreFetchCentralPulseSubscriber());

  return publisher;
}
