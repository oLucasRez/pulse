import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { AuthState } from '../../types';

export const signOutAction = createAction('auth/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.me = null;
  });
}
