import { CreateCentralPulseObserver } from '@data/observers';

import { makeCentralPulseStoreCreateCentralPulseSubscriber } from '@main/factories';
import { CreateCentralPulsePublisher } from '@main/observers';

export function makeCreateCentralPulsePublisher(): CreateCentralPulseObserver.Publisher {
  const publisher = new CreateCentralPulsePublisher();

  publisher.subscribe(makeCentralPulseStoreCreateCentralPulseSubscriber());

  return publisher;
}
