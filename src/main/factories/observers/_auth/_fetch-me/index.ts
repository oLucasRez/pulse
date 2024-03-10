import { FetchMeObserver } from '@data/observers';
import { FetchMePublisher } from '@main/observers';

import { makeStoreFetchMeSubscriber } from '@main/factories';

export function makeFetchMePublisher(): FetchMeObserver.Publisher {
  const publisher = new FetchMePublisher();

  publisher.subscribe(makeStoreFetchMeSubscriber());

  return publisher;
}
