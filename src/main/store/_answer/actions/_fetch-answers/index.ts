import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { AnswerModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { AnswerState } from '../../types';

export const fetchAnswersAction = createAction<AnswerModel[]>(
  'answer/fetchAnswers',
);

export function fetchAnswersReducers(
  builder: ActionReducerMapBuilder<AnswerState>,
): void {
  builder.addCase(fetchAnswersAction, (state, { payload: answers }) => {
    const newAnswers = [...state.answers];

    answers.map((answer) => {
      const i = removeItem(newAnswers, (value) => value.id === answer.id);
      if (i === -1 && answer) newAnswers.push(answer);
      else if (answer) newAnswers.splice(i, 0, answer);
    });

    state.answers = newAnswers;
  });
}
