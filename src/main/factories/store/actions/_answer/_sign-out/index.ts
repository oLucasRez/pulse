import { SignOutObserver } from '@data/observers';

import { AnswerStoreSignOutSubscriber } from '@main/store';

export function makeAnswerStoreSignOutSubscriber(): SignOutObserver.Subscriber {
  return new AnswerStoreSignOutSubscriber();
}
