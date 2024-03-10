import { PlayerModel } from '@domain/models';

import { BanPlayerObserver } from '@data/observers';

import { store } from '@main/store';

import { banPlayerAction } from '../../actions';

export class PlayerStoreBanPlayerSubscriber
  implements BanPlayerObserver.Subscriber
{
  public onBanPlayer(player: PlayerModel): void {
    store.dispatch(banPlayerAction(player));
  }
}
