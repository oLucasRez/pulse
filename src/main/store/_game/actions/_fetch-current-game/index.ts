import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { removeItem } from '@domain/utils';

import { GameState } from '../../types';

export const fetchCurrentGameAction = createAction<GameModel | null>(
  'game/fetchCurrentGame',
);

export function fetchCurrentGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchCurrentGameAction, (state, { payload: currentGame }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === currentGame?.id);
    if (i === -1 && currentGame) newGames.push(currentGame);
    else if (currentGame) newGames.splice(i, 0, currentGame);

    state.games = newGames;
  });
}
