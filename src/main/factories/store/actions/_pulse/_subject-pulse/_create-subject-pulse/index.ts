import { CreateSubjectPulseObserver } from '@data/observers';

import { SubjectPulseStoreCreateSubjectPulseSubscriber } from '@main/store';

export function makeSubjectPulseStoreCreateSubjectPulseSubscriber(): CreateSubjectPulseObserver.Subscriber {
  return new SubjectPulseStoreCreateSubjectPulseSubscriber();
}
