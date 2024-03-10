import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { removeItem } from '@domain/utils';

import { GameState } from '../../types';

export const createGameAction = createAction<GameModel>('game/createGame');

export function createGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(createGameAction, (state, { payload: game }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    state.games = newGames;
  });
}
