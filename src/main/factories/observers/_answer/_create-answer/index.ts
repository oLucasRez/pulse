import { CreateAnswerObserver } from '@data/observers';

import { makeAnswerStoreCreateAnswerSubscriber } from '@main/factories';
import { CreateAnswerPublisher } from '@main/observers';

export function makeCreateAnswerPublisher(): CreateAnswerObserver.Publisher {
  const publisher = new CreateAnswerPublisher();

  publisher.subscribe(makeAnswerStoreCreateAnswerSubscriber());

  return publisher;
}
