import { ChangeCurrentGameObserver } from '@data/observers';

import { SubjectPulseStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeSubjectPulseStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new SubjectPulseStoreChangeCurrentGameSubscriber();
}
