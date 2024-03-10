import { PlayerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace BanPlayerObserver {
  export interface Subscriber {
    onBanPlayer(player: PlayerModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyBanPlayer(player: PlayerModel): void;
  }
}
