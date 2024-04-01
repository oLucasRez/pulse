import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { QuestionState } from '../../types';

export const signOutAction = createAction('question/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<QuestionState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.questions = [];
  });
}
