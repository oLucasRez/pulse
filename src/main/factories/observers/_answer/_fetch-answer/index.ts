import { FetchAnswerObserver } from '@data/observers';

import { makeAnswerStoreFetchAnswerSubscriber } from '@main/factories';
import { FetchAnswerPublisher } from '@main/observers';

export function makeFetchAnswerPublisher(): FetchAnswerObserver.Publisher {
  const publisher = new FetchAnswerPublisher();

  publisher.subscribe(makeAnswerStoreFetchAnswerSubscriber());

  return publisher;
}
