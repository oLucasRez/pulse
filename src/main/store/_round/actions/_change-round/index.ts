import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { RoundModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { RoundState } from '../../types';

export const changeRoundAction = createAction<RoundModel>('round/changeRound');

export function changeRoundReducers(
  builder: ActionReducerMapBuilder<RoundState>,
): void {
  builder.addCase(changeRoundAction, (state, { payload: round }) => {
    const newRounds = [...state.rounds];

    const i = removeItem(newRounds, (value) => value.id === round.id);
    if (i === -1) newRounds.push(round);
    else newRounds.splice(i, 0, round);

    state.rounds = newRounds;
  });
}
