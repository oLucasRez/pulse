import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { AnswerModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { AnswerState } from '../../types';

export const fetchAnswerAction =
  createAction<[string, AnswerModel | null]>('answer/fetchAnswer');

export function fetchAnswerReducers(
  builder: ActionReducerMapBuilder<AnswerState>,
): void {
  builder.addCase(fetchAnswerAction, (state, { payload: [id, answer] }) => {
    const newAnswers = [...state.answers];

    const i = removeItem(newAnswers, (value) => value.id === id);
    if (i === -1 && answer) newAnswers.push(answer);
    else if (answer) newAnswers.splice(i, 0, answer);

    state.answers = newAnswers;
  });
}
