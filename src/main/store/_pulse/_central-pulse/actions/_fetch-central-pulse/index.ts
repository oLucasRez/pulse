import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralPulseModel } from '@domain/models';

import { CentralPulseState } from '../../types';

export const fetchCentralPulseAction = createAction<CentralPulseModel | null>(
  'centralPulse/fetchCentralPulse',
);

export function fetchCentralPulseReducers(
  builder: ActionReducerMapBuilder<CentralPulseState>,
): void {
  builder.addCase(
    fetchCentralPulseAction,
    (state, { payload: centralPulse }) => {
      state.centralPulse = centralPulse;
    },
  );
}
