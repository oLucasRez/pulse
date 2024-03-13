import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { PlayerState } from '../../types';

export const fetchPlayersAction = createAction<PlayerModel[]>(
  'player/fetchPlayers',
);

export function fetchPlayersReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(fetchPlayersAction, (state, { payload: players }) => {
    const newPlayers = [...state.players];

    players.map((player) => {
      const i = removeItem(newPlayers, (value) => value.id === player.id);
      if (i === -1 && player) newPlayers.push(player);
      else if (player) newPlayers.splice(i, 0, player);
    });

    state.players = newPlayers;
  });
}
