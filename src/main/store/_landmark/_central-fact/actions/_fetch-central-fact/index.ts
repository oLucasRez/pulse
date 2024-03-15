import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralFactModel } from '@domain/models';

import { CentralFactState } from '../../types';

export const fetchCentralFactAction = createAction<CentralFactModel | null>(
  'centralFact/fetchCentralFact',
);

export function fetchCentralFactReducers(
  builder: ActionReducerMapBuilder<CentralFactState>,
): void {
  builder.addCase(fetchCentralFactAction, (state, { payload: centralFact }) => {
    state.centralFact = centralFact;
  });
}
