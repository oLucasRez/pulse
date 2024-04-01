import { SignOutObserver } from '@data/observers';

import { SubjectStoreSignOutSubscriber } from '@main/store';

export function makeSubjectStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new SubjectStoreSignOutSubscriber();
}
