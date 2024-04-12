import { FetchAnswersObserver } from '@data/observers';

import { AnswerStoreFetchAnswersSubscriber } from '@main/store';

export function makeAnswerStoreFetchAnswersSubscriber(): FetchAnswersObserver.Subscriber {
  return new AnswerStoreFetchAnswersSubscriber();
}
