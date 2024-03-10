import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { StartGameObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { GameState } from '../../types';

const startGameAction = createAction<GameModel>('game/startGame');

export class GameStoreStartGameSubscriber
  implements StartGameObserver.Subscriber
{
  public onStartGame(game: GameModel): void {
    store.dispatch(startGameAction(game));
  }
}

export function startGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(startGameAction, (state, { payload: game }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    state.games = newGames;
  });
}
