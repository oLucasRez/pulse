import { SignOutObserver } from '@data/observers';

import { SubjectPulseStoreSignOutSubscriber } from '@main/store';

export function makeSubjectPulseStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new SubjectPulseStoreSignOutSubscriber();
}
