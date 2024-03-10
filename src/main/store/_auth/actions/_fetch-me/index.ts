import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { UserModel } from '@domain/models';

import { FetchMeObserver } from '@data/observers';

import { store } from '@main/store';

import { AuthState } from '../../types';

const fetchMeAction = createAction<UserModel | null>('auth/fetchMe');

export class AuthStoreFetchMeSubscriber implements FetchMeObserver.Subscriber {
  public onFetchMe(me: UserModel | null): void {
    store.dispatch(fetchMeAction(me));
  }
}

export function fetchMeReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(fetchMeAction, (state, action) => {
    state.me = action.payload;
  });
}
