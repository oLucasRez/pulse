import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { RoundState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'round/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<RoundState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.rounds = [];
  });
}
