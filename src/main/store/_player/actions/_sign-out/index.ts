import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerState } from '../../types';

export const signOutAction = createAction('player/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.players = [];
  });
}
