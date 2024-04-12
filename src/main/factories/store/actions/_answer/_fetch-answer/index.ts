import { FetchAnswerObserver } from '@data/observers';

import { AnswerStoreFetchAnswerSubscriber } from '@main/store';

export function makeAnswerStoreFetchAnswerSubscriber(): FetchAnswerObserver.Subscriber {
  return new AnswerStoreFetchAnswerSubscriber();
}
