import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { RoundState } from '../../types';

export const signOutAction = createAction('round/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<RoundState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.rounds = [];
  });
}
