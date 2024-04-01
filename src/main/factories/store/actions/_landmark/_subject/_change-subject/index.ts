import { ChangeSubjectObserver } from '@data/observers';

import { SubjectStoreChangeSubjectSubscriber } from '@main/store';

export function makeSubjectStoreChangeSubjectSubscriber(): ChangeSubjectObserver.Subscriber {
  return new SubjectStoreChangeSubjectSubscriber();
}
