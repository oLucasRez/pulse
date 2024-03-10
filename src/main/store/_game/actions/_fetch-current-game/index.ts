import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { FetchCurrentGameObserver } from '@data/observers';

import { store } from '@main/store';

import { GameState } from '../../types';

const fetchCurrentGameAction = createAction<GameModel | null>(
  'game/fetchCurrentGame',
);

export class GameStoreFetchCurrentGameSubscriber
  implements FetchCurrentGameObserver.Subscriber
{
  public onFetchCurrentGame(currentGame: GameModel | null): void {
    store.dispatch(fetchCurrentGameAction(currentGame));
  }
}

export function fetchCurrentGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(fetchCurrentGameAction, (state, { payload: currentGame }) => {
    state.currentGame = currentGame;
  });
}
