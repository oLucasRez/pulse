import { FetchSubjectPulseObserver } from '@data/observers';

import { SubjectPulseStoreFetchSubjectPulseSubscriber } from '@main/store';

export function makeSubjectPulseStoreFetchSubjectPulseSubscriber(): FetchSubjectPulseObserver.Subscriber {
  return new SubjectPulseStoreFetchSubjectPulseSubscriber();
}
