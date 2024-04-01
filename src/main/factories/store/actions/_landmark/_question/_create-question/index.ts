import { CreateQuestionObserver } from '@data/observers';

import { QuestionStoreCreateQuestionSubscriber } from '@main/store';

export function makeQuestionStoreCreateQuestionSubscriber(): CreateQuestionObserver.Subscriber {
  return new QuestionStoreCreateQuestionSubscriber();
}
