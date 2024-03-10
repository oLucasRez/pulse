import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';

import { PlayerState } from '../../types';

export const fetchPlayersAction = createAction<PlayerModel[]>(
  'player/fetchPlayers',
);

export function fetchPlayersReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(fetchPlayersAction, (state, { payload: players }) => {
    state.players = players;
  });
}
