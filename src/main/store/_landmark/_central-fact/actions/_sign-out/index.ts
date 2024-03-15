import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { CentralFactState } from '../../types';

export const signOutAction = createAction('centralFact/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<CentralFactState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.centralFact = null;
  });
}
