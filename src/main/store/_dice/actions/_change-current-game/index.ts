import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { DiceState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'dice/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<DiceState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.dices = [];
  });
}
