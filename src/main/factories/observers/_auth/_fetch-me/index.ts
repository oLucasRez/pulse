import { FetchMeObserver } from '@data/observers';
import { FetchMePublisher } from '@main/observers';

import { makeAuthStoreFetchMeSubscriber } from '@main/factories';

export function makeFetchMePublisher(): FetchMeObserver.Publisher {
  const publisher = new FetchMePublisher();

  publisher.subscribe(makeAuthStoreFetchMeSubscriber());

  return publisher;
}
