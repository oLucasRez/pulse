import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectState } from '../../types';

export const signOutAction = createAction('subject/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<SubjectState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.subjects = [];
  });
}
