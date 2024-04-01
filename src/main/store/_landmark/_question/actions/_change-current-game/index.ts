import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { QuestionState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'question/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<QuestionState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.questions = [];
  });
}
