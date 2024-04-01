import { SignOutObserver } from '@data/observers';

import { QuestionStoreSignOutSubscriber } from '@main/store';

export function makeQuestionStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new QuestionStoreSignOutSubscriber();
}
