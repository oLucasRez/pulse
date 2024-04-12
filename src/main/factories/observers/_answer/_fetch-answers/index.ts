import { FetchAnswersObserver } from '@data/observers';

import { makeAnswerStoreFetchAnswersSubscriber } from '@main/factories';
import { FetchAnswersPublisher } from '@main/observers';

export function makeFetchAnswersPublisher(): FetchAnswersObserver.Publisher {
  const publisher = new FetchAnswersPublisher();

  publisher.subscribe(makeAnswerStoreFetchAnswersSubscriber());

  return publisher;
}
