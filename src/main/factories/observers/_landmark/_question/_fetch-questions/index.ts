import { FetchQuestionsObserver } from '@data/observers';

import { makeQuestionStoreFetchQuestionsSubscriber } from '@main/factories';
import { FetchQuestionsPublisher } from '@main/observers';

export function makeFetchQuestionsPublisher(): FetchQuestionsObserver.Publisher {
  const publisher = new FetchQuestionsPublisher();

  publisher.subscribe(makeQuestionStoreFetchQuestionsSubscriber());

  return publisher;
}
