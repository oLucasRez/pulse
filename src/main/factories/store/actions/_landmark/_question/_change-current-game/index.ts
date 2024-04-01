import { ChangeCurrentGameObserver } from '@data/observers';

import { QuestionStoreChangeCurrentGameSubscriber } from '@main/store';

export function makeQuestionStoreChangeCurrentGameSubscriber(): ChangeCurrentGameObserver.Subscriber {
  return new QuestionStoreChangeCurrentGameSubscriber();
}
