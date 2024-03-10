import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SignOutObserver } from '@data/observers';

import { store } from '@main/store';

import { AuthState } from '../../types';

const signOutAction = createAction('auth/signOut');

export class AuthStoreSignOutSubscriber implements SignOutObserver.Subscriber {
  public onSignOut(): void {
    store.dispatch(signOutAction());
  }
}

export function signOutReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.me = null;
  });
}
