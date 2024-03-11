import { CreateSubjectObserver } from '@data/observers';

import { SubjectStoreCreateSubjectSubscriber } from '@main/store';

export function makeSubjectStoreCreateSubjectSubscriber(): CreateSubjectObserver.Subscriber {
  return new SubjectStoreCreateSubjectSubscriber();
}
