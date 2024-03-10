import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { PlayerState } from '../../types';

export const fetchPlayerAction =
  createAction<[string, PlayerModel | null]>('player/fetchPlayer');

export function fetchPlayerReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(fetchPlayerAction, (state, { payload: [id, player] }) => {
    const newPlayers = [...state.players];

    const i = removeItem(newPlayers, (value) => value.id === id);
    if (i === -1 && player) newPlayers.push(player);
    else if (player) newPlayers.splice(i, 0, player);

    state.players = newPlayers;
  });
}
