import { CreateSubjectPulseObserver } from '@data/observers';

import { makeSubjectPulseStoreCreateSubjectPulseSubscriber } from '@main/factories';
import { CreateSubjectPulsePublisher } from '@main/observers';

export function makeCreateSubjectPulsePublisher(): CreateSubjectPulseObserver.Publisher {
  const publisher = new CreateSubjectPulsePublisher();

  publisher.subscribe(makeSubjectPulseStoreCreateSubjectPulseSubscriber());

  return publisher;
}
