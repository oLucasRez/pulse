import { GameModel } from '@domain/models';

import { CreateGameObserver } from '@data/observers';

import { store } from '@main/store';

import { createGameAction } from '../../actions';

export class GameStoreCreateGameSubscriber
  implements CreateGameObserver.Subscriber
{
  public onCreateGame(game: GameModel): void {
    store.dispatch(createGameAction(game));
  }
}
