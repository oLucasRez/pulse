import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { AnswerModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { AnswerState } from '../../types';

export const createAnswerAction = createAction<AnswerModel>(
  'answer/createAnswer',
);

export function createAnswerReducers(
  builder: ActionReducerMapBuilder<AnswerState>,
): void {
  builder.addCase(createAnswerAction, (state, { payload: answer }) => {
    const newAnswers = [...state.answers];

    const i = removeItem(newAnswers, (value) => value.id === answer.id);
    if (i === -1) newAnswers.push(answer);
    else newAnswers.splice(i, 0, answer);

    state.answers = newAnswers;
  });
}
