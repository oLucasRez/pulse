import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { AuthState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'auth/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<AuthState>,
): void {
  builder.addCase(
    changeCurrentGameAction,
    (state, { payload: currentGame }) => {
      if (!state.me) return;

      state.me.currentGameID = currentGame?.id ?? null;
    },
  );
}
