import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { AnswerState } from '../../types';

export const signOutAction = createAction('answer/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<AnswerState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.answers = [];
  });
}
