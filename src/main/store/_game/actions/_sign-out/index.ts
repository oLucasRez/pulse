import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameState } from '../../types';

export const signOutAction = createAction('game/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.games = [];
    state.currentGame = null;
  });
}
