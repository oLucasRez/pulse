import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { RoundModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { RoundState } from '../../types';

export const fetchRoundAction =
  createAction<[string, RoundModel | null]>('round/fetchRound');

export function fetchRoundReducers(
  builder: ActionReducerMapBuilder<RoundState>,
): void {
  builder.addCase(fetchRoundAction, (state, { payload: [id, round] }) => {
    const newRounds = [...state.rounds];

    const i = removeItem(newRounds, (value) => value.id === id);
    if (i === -1 && round) newRounds.push(round);
    else if (round) newRounds.splice(i, 0, round);

    state.rounds = newRounds;
  });
}
