import { GameModel } from '@domain/models';

import { GameObserver } from '@data/observers';

import { store } from '..';
import {
  changeGameAction,
  createGameAction,
  deleteGameAction,
  fetchGameAction,
  fetchGamesAction,
  startGameAction,
} from './actions';

export class StoreGameSubscriber implements GameObserver.Subscriber {
  public onFetchGames(games: GameModel[]): void {
    store.dispatch(fetchGamesAction(games));
  }

  public onFetchGame(id: string, game: GameModel | null): void {
    store.dispatch(fetchGameAction([id, game]));
  }

  public onCreateGame(game: GameModel): void {
    store.dispatch(createGameAction(game));
  }

  public onChangeGame(game: GameModel): void {
    store.dispatch(changeGameAction(game));
  }

  public onDeleteGame(id: string): void {
    store.dispatch(deleteGameAction(id));
  }

  public onStartGame(game: GameModel): void {
    store.dispatch(startGameAction(game));
  }
}

export * from './actions';
export * from './selectors';
export * from './slice';
