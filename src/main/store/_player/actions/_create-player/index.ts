import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';

import { CreatePlayerObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { PlayerState } from '../../types';

const createPlayerAction = createAction<PlayerModel>('player/createPlayer');

export class PlayerStoreCreatePlayerSubscriber
  implements CreatePlayerObserver.Subscriber
{
  public onCreatePlayer(player: PlayerModel): void {
    store.dispatch(createPlayerAction(player));
  }
}

export function createPlayerReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(createPlayerAction, (state, { payload: player }) => {
    const newPlayers = [...state.players];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    state.players = newPlayers;
  });
}
