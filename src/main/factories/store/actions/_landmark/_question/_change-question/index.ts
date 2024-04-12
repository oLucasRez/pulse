import { ChangeQuestionObserver } from '@data/observers';

import { QuestionStoreChangeQuestionSubscriber } from '@main/store';

export function makeQuestionStoreChangeQuestionSubscriber(): ChangeQuestionObserver.Subscriber {
  return new QuestionStoreChangeQuestionSubscriber();
}
