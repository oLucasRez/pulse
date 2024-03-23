import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralPulseModel } from '@domain/models';

import { CentralPulseState } from '../../types';

export const createCentralPulseAction = createAction<CentralPulseModel>(
  'centralPulse/createCentralPulse',
);

export function createCentralPulseReducers(
  builder: ActionReducerMapBuilder<CentralPulseState>,
): void {
  builder.addCase(
    createCentralPulseAction,
    (state, { payload: centralPulse }) => {
      state.centralPulse = centralPulse;
    },
  );
}
