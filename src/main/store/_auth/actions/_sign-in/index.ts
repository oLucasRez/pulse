import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { UserModel } from '@domain/models';

import { SignInObserver } from '@data/observers';

import { store } from '@main/store';

import { AuthState } from '../../types';

const signInAction = createAction<UserModel>('auth/signIn');

export class AuthStoreSignInSubscriber implements SignInObserver.Subscriber {
  public onSignIn(me: UserModel): void {
    store.dispatch(signInAction(me));
  }
}

export function signInReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(signInAction, (state, action) => {
    state.me = action.payload;
  });
}
