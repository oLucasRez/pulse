import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { GameState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'game/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(
    changeCurrentGameAction,
    (state, { payload: currentGame }) => {
      if (!currentGame) return;

      const newGames = [...state.games];

      const i = removeItem(newGames, (value) => value.id === currentGame.id);
      if (i === -1) newGames.push(currentGame);
      else newGames.splice(i, 0, currentGame);

      state.games = newGames;
    },
  );
}
