import { FetchMeObserver } from '@data/observers';

import { makeAuthStoreFetchMeSubscriber } from '@main/factories';
import { FetchMePublisher } from '@main/observers';

export function makeFetchMePublisher(): FetchMeObserver.Publisher {
  const publisher = new FetchMePublisher();

  publisher.subscribe(makeAuthStoreFetchMeSubscriber());

  return publisher;
}
