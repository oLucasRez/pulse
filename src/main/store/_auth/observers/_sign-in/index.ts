import { UserModel } from '@domain/models';

import { SignInObserver } from '@data/observers';

import { store } from '@main/store';

import { signInAction } from '../../actions';

export class AuthStoreSignInSubscriber implements SignInObserver.Subscriber {
  public onSignIn(me: UserModel): void {
    store.dispatch(signInAction(me));
  }
}
