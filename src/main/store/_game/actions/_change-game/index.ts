import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { ChangeGameObserver } from '@data/observers';

import { removeItem } from '@domain/utils';

import { store } from '@main/store';

import { GameState } from '../../types';

const changeGameAction = createAction<GameModel>('game/changeGame');

export class GameStoreChangeGameSubscriber
  implements ChangeGameObserver.Subscriber
{
  public onChangeGame(game: GameModel): void {
    store.dispatch(changeGameAction(game));
  }
}

export function changeGameReducers(
  builder: ActionReducerMapBuilder<GameState>,
): void {
  builder.addCase(changeGameAction, (state, { payload: game }) => {
    const newGames = [...state.games];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    state.games = newGames;
  });
}
