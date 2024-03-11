import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { SubjectState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'subject/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<SubjectState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.subjects = [];
  });
}
