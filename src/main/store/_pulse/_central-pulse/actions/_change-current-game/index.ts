import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { CentralPulseState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'centralPulse/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<CentralPulseState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.centralPulse = null;
  });
}
