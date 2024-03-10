import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { UserModel } from '@domain/models';

import { ChangeMeObserver } from '@data/observers';

import { store } from '@main/store';

import { AuthState } from '../../types';

const changeMeAction = createAction<UserModel | null>('auth/changeMe');

export class AuthStoreChangeMeSubscriber
  implements ChangeMeObserver.Subscriber
{
  public onChangeMe(me: UserModel): void {
    store.dispatch(changeMeAction(me));
  }
}

export function changeMeReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(changeMeAction, (state, action) => {
    state.me = action.payload;
  });
}
