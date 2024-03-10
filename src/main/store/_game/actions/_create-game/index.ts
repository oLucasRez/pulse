import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { CreateGameObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { GameState } from '../../types';

const createGameAction = createAction<GameModel>('game/createGame');

export class GameStoreCreateGameSubscriber
  implements CreateGameObserver.Subscriber
{
  public onCreateGame(game: GameModel): void {
    store.dispatch(createGameAction(game));
  }
}

export function createGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(createGameAction, (state, { payload: game }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    state.games = newGames;
  });
}
