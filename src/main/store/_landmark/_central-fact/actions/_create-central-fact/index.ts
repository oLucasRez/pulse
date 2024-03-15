import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralFactModel } from '@domain/models';

import { CentralFactState } from '../../types';

export const createCentralFactAction = createAction<CentralFactModel>(
  'centralFact/createCentralFact',
);

export function createCentralFactReducers(
  builder: ActionReducerMapBuilder<CentralFactState>,
): void {
  builder.addCase(
    createCentralFactAction,
    (state, { payload: centralFact }) => {
      state.centralFact = centralFact;
    },
  );
}
