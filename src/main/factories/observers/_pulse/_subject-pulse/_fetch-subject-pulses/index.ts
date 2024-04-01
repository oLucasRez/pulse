import { FetchSubjectPulsesObserver } from '@data/observers';

import { makeSubjectPulseStoreFetchSubjectPulsesSubscriber } from '@main/factories';
import { FetchSubjectPulsesPublisher } from '@main/observers';

export function makeFetchSubjectPulsesPublisher(): FetchSubjectPulsesObserver.Publisher {
  const publisher = new FetchSubjectPulsesPublisher();

  publisher.subscribe(makeSubjectPulseStoreFetchSubjectPulsesSubscriber());

  return publisher;
}
