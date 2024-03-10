import { PlayerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreatePlayerObserver {
  export interface Subscriber {
    onCreatePlayer(player: PlayerModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreatePlayer(player: PlayerModel): void;
  }
}
