import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { AnswerState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'answer/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<AnswerState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.answers = [];
  });
}
