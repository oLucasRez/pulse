import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';

import { FetchPlayerObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { PlayerState } from '../../types';

const fetchPlayerAction =
  createAction<[string, PlayerModel | null]>('player/fetchPlayer');

export class PlayerStoreFetchPlayerSubscriber
  implements FetchPlayerObserver.Subscriber
{
  public onFetchPlayer(id: string, player: PlayerModel | null): void {
    store.dispatch(fetchPlayerAction([id, player]));
  }
}

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
