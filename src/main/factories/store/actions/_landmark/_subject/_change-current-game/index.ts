import { ChangeCurrentGameObserver } from '@data/observers';

import { SubjectStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeSubjectStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new SubjectStoreChangeCurrentGameSubscriber();
}
