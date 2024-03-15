import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { CentralFactState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'centralFact/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<CentralFactState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.centralFact = null;
  });
}
