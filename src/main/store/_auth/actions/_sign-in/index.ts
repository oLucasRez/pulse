import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { UserModel } from '@domain/models';

import { AuthState } from '../../types';

export const signInAction = createAction<UserModel>('auth/signIn');

export function signInReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(signInAction, (state, action) => {
    state.me = action.payload;
  });
}
