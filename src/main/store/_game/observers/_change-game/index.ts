import { GameModel } from '@domain/models';

import { ChangeGameObserver } from '@data/observers';

import { store } from '@main/store';

import { changeGameAction } from '../../actions';

export class GameStoreChangeGameSubscriber
  implements ChangeGameObserver.Subscriber
{
  public onChangeGame(game: GameModel): void {
    store.dispatch(changeGameAction(game));
  }
}
