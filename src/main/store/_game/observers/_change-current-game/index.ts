import { GameModel } from '@domain/models';

import { ChangeCurrentGameObserver } from '@data/observers';

import { store } from '@main/store';

import { changeCurrentGameAction } from '../../actions';

export class GameStoreChangeCurrentGameSubscriber
  implements ChangeCurrentGameObserver.Subscriber
{
  public onChangeCurrentGame(currentGame: GameModel | null): void {
    store.dispatch(changeCurrentGameAction(currentGame));
  }
}