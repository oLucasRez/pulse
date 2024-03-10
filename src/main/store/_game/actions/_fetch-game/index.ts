import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { FetchGameObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { GameState } from '../../types';

const fetchGameAction =
  createAction<[string, GameModel | null]>('game/fetchGame');

export class GameStoreFetchGameSubscriber
  implements FetchGameObserver.Subscriber
{
  public onFetchGame(id: string, game: GameModel | null): void {
    store.dispatch(fetchGameAction([id, game]));
  }
}

export function fetchGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchGameAction, (state, { payload: [id, game] }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === id);
    if (i === -1 && game) newGames.push(game);
    else if (game) newGames.splice(i, 0, game);

    state.games = newGames;
  });
}
