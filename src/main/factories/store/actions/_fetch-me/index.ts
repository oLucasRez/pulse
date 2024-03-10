import { FetchMeObserver } from '@data/observers';

import { AuthStoreFetchMeSubscriber } from '@main/store';

export function makeStoreFetchMeSubscriber(): FetchMeObserver.Subscriber {
  return new AuthStoreFetchMeSubscriber();
}
