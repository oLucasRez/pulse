import { DeletePlayerObserver } from '@data/observers';

import { store } from '@main/store';

import { deletePlayerAction } from '../../actions';

export class PlayerStoreDeletePlayerSubscriber
  implements DeletePlayerObserver.Subscriber
{
  public onDeletePlayer(id: string): void {
    store.dispatch(deletePlayerAction(id));
  }
}
