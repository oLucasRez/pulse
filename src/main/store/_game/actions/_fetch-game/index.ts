import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { removeItem } from '@domain/utils';

import { GameState } from '../../types';

export const fetchGameAction =
  createAction<[string, GameModel | null]>('game/fetchGame');

export function fetchGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchGameAction, (state, { payload: [id, game] }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === id);
    if (i === -1 && game) newGames.push(game);
    else if (game) newGames.splice(i, 0, game);

    state.games = newGames;
  });
}
