import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralFactModel } from '@domain/models';

import { CentralFactState } from '../../types';

export const changeCentralFactAction = createAction<CentralFactModel>(
  'centralFact/changeCentralFact',
);

export function changeCentralFactReducers(
  builder: ActionReducerMapBuilder<CentralFactState>,
): void {
  builder.addCase(
    changeCentralFactAction,
    (state, { payload: centralFact }) => {
      state.centralFact = centralFact;
    },
  );
}
