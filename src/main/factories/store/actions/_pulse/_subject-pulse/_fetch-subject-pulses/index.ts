import { FetchSubjectPulsesObserver } from '@data/observers';

import { SubjectPulseStoreFetchSubjectPulsesSubscriber } from '@main/store';

export function makeSubjectPulseStoreFetchSubjectPulsesSubscriber(): FetchSubjectPulsesObserver.Subscriber {
  return new SubjectPulseStoreFetchSubjectPulsesSubscriber();
}
