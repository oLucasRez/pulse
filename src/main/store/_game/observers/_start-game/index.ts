import { GameModel } from '@domain/models';

import { StartGameObserver } from '@data/observers';

import { store } from '@main/store';

import { startGameAction } from '../../actions';

export class GameStoreStartGameSubscriber
  implements StartGameObserver.Subscriber
{
  public onStartGame(game: GameModel): void {
    store.dispatch(startGameAction(game));
  }
}
