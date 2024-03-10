import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { DeletePlayerObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { PlayerState } from '../../types';

const deletePlayerAction = createAction<string>('player/deletePlayer');

export class PlayerStoreDeletePlayerSubscriber
  implements DeletePlayerObserver.Subscriber
{
  public onDeletePlayer(id: string): void {
    store.dispatch(deletePlayerAction(id));
  }
}

export function deletePlayerReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(deletePlayerAction, (state, { payload: id }) => {
    const newPlayers = [...state.players];

    removeItem(newPlayers, (value) => value.id === id);

    state.players = newPlayers;
  });
}
