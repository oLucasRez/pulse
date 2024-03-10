import { PlayerModel } from '@domain/models';

import { CreatePlayerObserver } from '@data/observers';

import { store } from '@main/store';

import { createPlayerAction } from '../../actions';

export class PlayerStoreCreatePlayerSubscriber
  implements CreatePlayerObserver.Subscriber
{
  public onCreatePlayer(player: PlayerModel): void {
    store.dispatch(createPlayerAction(player));
  }
}
