import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralPulseModel } from '@domain/models';

import { CentralPulseState } from '../../types';

export const changeCentralPulseAction = createAction<CentralPulseModel>(
  'centralPulse/changeCentralPulse',
);

export function changeCentralPulseReducers(
  builder: ActionReducerMapBuilder<CentralPulseState>,
): void {
  builder.addCase(
    changeCentralPulseAction,
    (state, { payload: centralPulse }) => {
      state.centralPulse = centralPulse;
    },
  );
}
