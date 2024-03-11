import { FetchSubjectObserver } from '@data/observers';

import { SubjectStoreFetchSubjectSubscriber } from '@main/store';

export function makeSubjectStoreFetchSubjectSubscriber(): FetchSubjectObserver.Subscriber {
  return new SubjectStoreFetchSubjectSubscriber();
}
