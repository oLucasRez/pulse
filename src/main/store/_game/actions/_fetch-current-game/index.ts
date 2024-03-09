import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { GameState } from '../../types';

export const fetchCurrentGameAction = createAction<GameModel | null>(
  'game/fetchCurrentGame',
);

export function fetchCurrentGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchCurrentGameAction, (state, { payload: currentGame }) => {
    state.currentGame = currentGame;
  });
}
