import { ChangeCurrentGameObserver } from '@data/observers';

import { AnswerStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeAnswerStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new AnswerStoreChangeCurrentGameSubscriber();
}
