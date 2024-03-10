import { DeleteGameObserver } from '@data/observers';

import { store } from '@main/store';

import { deleteGameAction } from '../../actions';

export class GameStoreDeleteGameSubscriber
  implements DeleteGameObserver.Subscriber
{
  public onDeleteGame(id: string): void {
    store.dispatch(deleteGameAction(id));
  }
}
