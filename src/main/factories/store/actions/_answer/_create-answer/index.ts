import { CreateAnswerObserver } from '@data/observers';

import { AnswerStoreCreateAnswerSubscriber } from '@main/store';

export function makeAnswerStoreCreateAnswerSubscriber(): CreateAnswerObserver.Subscriber {
  return new AnswerStoreCreateAnswerSubscriber();
}
