import { PlayerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangePlayerObserver {
  export interface Subscriber {
    onChangePlayer(player: PlayerModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangePlayer(player: PlayerModel): void;
  }
}
