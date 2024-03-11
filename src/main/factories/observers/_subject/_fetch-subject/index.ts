import { FetchSubjectObserver } from '@data/observers';

import { makeSubjectStoreFetchSubjectSubscriber } from '@main/factories';
import { FetchSubjectPublisher } from '@main/observers';

export function makeFetchSubjectPublisher(): FetchSubjectObserver.Publisher {
  const publisher = new FetchSubjectPublisher();

  publisher.subscribe(makeSubjectStoreFetchSubjectSubscriber());

  return publisher;
}
