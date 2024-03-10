import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { DeleteGameObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { GameState } from '../../types';

const deleteGameAction = createAction<string>('game/deleteGame');

export class GameStoreDeleteGameSubscriber
  implements DeleteGameObserver.Subscriber
{
  public onDeleteGame(id: string): void {
    store.dispatch(deleteGameAction(id));
  }
}

export function deleteGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(deleteGameAction, (state, { payload: id }) => {
    const newGames = [...state.games];

    removeItem(newGames, (value) => value.id === id);

    state.games = newGames;
  });
}
