import { UserModel } from '@domain/models';

import { AuthObserver } from '@data/observers';

import { store } from '..';
import {
  changeMeAction,
  fetchMeAction,
  signInAction,
  signOutAction,
} from './actions';

export class StoreAuthSubscriber implements AuthObserver.Subscriber {
  public onSignIn(me: UserModel): void {
    store.dispatch(signInAction(me));
  }

  public onSignOut(): void {
    store.dispatch(signOutAction());
  }

  public onFetchMe(me: UserModel | null): void {
    store.dispatch(fetchMeAction(me));
  }

  public onChangeMe(me: UserModel): void {
    store.dispatch(changeMeAction(me));
  }
}

export * from './actions';
export * from './selectors';
export * from './slice';
