import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { UserModel } from '@domain/models';

import { AuthState } from '../../types';

export const changeMeAction = createAction<UserModel | null>('auth/changeMe');

export function changeMeReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(changeMeAction, (state, action) => {
    state.me = action.payload;
  });
}
