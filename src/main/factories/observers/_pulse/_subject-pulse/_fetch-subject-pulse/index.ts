import { FetchSubjectPulseObserver } from '@data/observers';

import { makeSubjectPulseStoreFetchSubjectPulseSubscriber } from '@main/factories';
import { FetchSubjectPulsePublisher } from '@main/observers';

export function makeFetchSubjectPulsePublisher(): FetchSubjectPulseObserver.Publisher {
  const publisher = new FetchSubjectPulsePublisher();

  publisher.subscribe(makeSubjectPulseStoreFetchSubjectPulseSubscriber());

  return publisher;
}
