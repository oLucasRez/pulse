import { FetchSubjectsObserver } from '@data/observers';

import { makeSubjectStoreFetchSubjectsSubscriber } from '@main/factories';
import { FetchSubjectsPublisher } from '@main/observers';

export function makeFetchSubjectsPublisher(): FetchSubjectsObserver.Publisher {
  const publisher = new FetchSubjectsPublisher();

  publisher.subscribe(makeSubjectStoreFetchSubjectsSubscriber());

  return publisher;
}
