import { FetchQuestionsObserver } from '@data/observers';

import { QuestionStoreFetchQuestionsSubscriber } from '@main/store';

export function makeQuestionStoreFetchQuestionsSubscriber(): FetchQuestionsObserver.Subscriber {
  return new QuestionStoreFetchQuestionsSubscriber();
}
