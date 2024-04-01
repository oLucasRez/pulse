import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectPulseState } from '../../types';

export const signOutAction = createAction('subjectPulse/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<SubjectPulseState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.subjectPulses = [];
  });
}
