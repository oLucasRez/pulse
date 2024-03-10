import { UserModel } from '@domain/models';

import { FetchMeObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchMeAction } from '../../actions';

export class AuthStoreFetchMeSubscriber implements FetchMeObserver.Subscriber {
  public onFetchMe(me: UserModel | null): void {
    store.dispatch(fetchMeAction(me));
  }
}
