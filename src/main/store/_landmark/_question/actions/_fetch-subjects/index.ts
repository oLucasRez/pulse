import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { QuestionModel } from '@domain/models';

import { QuestionState } from '../../types';

export const fetchQuestionsAction = createAction<QuestionModel[]>(
  'question/fetchQuestions',
);

export function fetchQuestionsReducers(
  builder: ActionReducerMapBuilder<QuestionState>,
): void {
  builder.addCase(fetchQuestionsAction, (state, { payload: questions }) => {
    state.questions = questions;
  });
}
