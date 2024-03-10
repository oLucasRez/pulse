import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { UserModel } from '@domain/models';

import { AuthState } from '../../types';

export const fetchMeAction = createAction<UserModel | null>('auth/fetchMe');

export function fetchMeReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(fetchMeAction, (state, action) => {
    state.me = action.payload;
  });
}
