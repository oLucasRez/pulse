import { FetchSubjectsObserver } from '@data/observers';

import { SubjectStoreFetchSubjectsSubscriber } from '@main/store';

export function makeSubjectStoreFetchSubjectsSubscriber(): FetchSubjectsObserver.Subscriber {
  return new SubjectStoreFetchSubjectsSubscriber();
}
