import { ChangeCentralPulseObserver } from '@data/observers';

import { makeCentralPulseStoreChangeCentralPulseSubscriber } from '@main/factories';
import { ChangeCentralPulsePublisher } from '@main/observers';

export function makeChangeCentralPulsePublisher(): ChangeCentralPulseObserver.Publisher {
  const publisher = new ChangeCentralPulsePublisher();

  publisher.subscribe(makeCentralPulseStoreChangeCentralPulseSubscriber());

  return publisher;
}
