import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { removeItem } from '@domain/utils';

import { GameState } from '../../types';

export const deleteGameAction = createAction<string>('game/deleteGame');

export function deleteGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(deleteGameAction, (state, { payload: id }) => {
    const newGames = [...state.games];

    removeItem(newGames, (value) => value.id === id);

    state.games = newGames;
  });
}
