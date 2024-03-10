import { PlayerModel } from '@domain/models';

import { ChangePlayerObserver } from '@data/observers';

import { store } from '@main/store';

import { changePlayerAction } from '../../actions';

export class PlayerStoreChangePlayerSubscriber
  implements ChangePlayerObserver.Subscriber
{
  public onChangePlayer(player: PlayerModel): void {
    store.dispatch(changePlayerAction(player));
  }
}
