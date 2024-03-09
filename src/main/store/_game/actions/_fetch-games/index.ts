import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { GameState } from '../../types';

export const fetchGamesAction = createAction<GameModel[]>('game/fetchGames');

export function fetchGamesReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchGamesAction, (state, { payload: games }) => {
    state.games = games;
  });
}
