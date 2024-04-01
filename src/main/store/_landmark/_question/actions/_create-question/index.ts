import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { QuestionModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { QuestionState } from '../../types';

export const createQuestionAction = createAction<QuestionModel>(
  'question/createQuestion',
);

export function createQuestionReducers(
  builder: ActionReducerMapBuilder<QuestionState>,
): void {
  builder.addCase(createQuestionAction, (state, { payload: question }) => {
    const newQuestions = [...state.questions];

    const i = removeItem(newQuestions, (value) => value.id === question.id);
    if (i === -1) newQuestions.push(question);
    else newQuestions.splice(i, 0, question);

    state.questions = newQuestions;
  });
}
