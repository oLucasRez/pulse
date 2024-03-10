import { FetchMeObserver } from '@data/observers';

import { AuthStoreFetchMeSubscriber } from '@main/store';

export function makeAuthStoreFetchMeSubscriber(): FetchMeObserver.Subscriber {
  return new AuthStoreFetchMeSubscriber();
}
