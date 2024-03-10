import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { PlayerModel } from '@domain/models';

import { FetchPlayersObserver } from '@data/observers';

import { store } from '@main/store';

import { PlayerState } from '../../types';

const fetchPlayersAction = createAction<PlayerModel[]>('player/fetchPlayers');

export class PlayerStoreFetchPlayersSubscriber
  implements FetchPlayersObserver.Subscriber
{
  public onFetchPlayers(players: PlayerModel[]): void {
    store.dispatch(fetchPlayersAction(players));
  }
}

export function fetchPlayersReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(fetchPlayersAction, (state, { payload: players }) => {
    state.players = players;
  });
}
