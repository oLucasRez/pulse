import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { FetchGamesObserver } from '@data/observers';

import { store } from '@main/store';

import { GameState } from '../../types';

const fetchGamesAction = createAction<GameModel[]>('game/fetchGames');

export class GameStoreFetchGamesSubscriber
  implements FetchGamesObserver.Subscriber
{
  public onFetchGames(games: GameModel[]): void {
    store.dispatch(fetchGamesAction(games));
  }
}

export function fetchGamesReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchGamesAction, (state, { payload: games }) => {
    state.games = games;
  });
}
