import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralPulseState } from '../../types';

export const signOutAction = createAction('centralPulse/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<CentralPulseState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.centralPulse = null;
  });
}
