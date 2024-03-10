import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { removeItem } from '@domain/utils';

import { PlayerState } from '../../types';

export const deletePlayerAction = createAction<string>('player/deletePlayer');

export function deletePlayerReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(deletePlayerAction, (state, { payload: id }) => {
    const newPlayers = [...state.players];

    removeItem(newPlayers, (value) => value.id === id);

    state.players = newPlayers;
  });
}
