import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { PlayerState } from '../../types';

export const banPlayerAction = createAction<PlayerModel>('player/banPlayer');

export function banPlayerReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(banPlayerAction, (state, { payload: player }) => {
    const newPlayers = [...state.players];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    state.players = newPlayers;
  });
}
