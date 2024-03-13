import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { RoundModel } from '@domain/models';

import { RoundState } from '../../types';

export const fetchRoundsAction =
  createAction<RoundModel[]>('round/fetchRounds');

export function fetchRoundsReducers(
  builder: ActionReducerMapBuilder<RoundState>,
): void {
  builder.addCase(fetchRoundsAction, (state, { payload: rounds }) => {
    state.rounds = rounds;
  });
}
