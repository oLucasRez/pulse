import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { SubjectPulseState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'subjectPulse/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<SubjectPulseState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.subjectPulses = [];
  });
}
