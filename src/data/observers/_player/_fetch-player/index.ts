import { PlayerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchPlayerObserver {
  export interface Subscriber {
    onFetchPlayer(id: string, player: PlayerModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchPlayer(id: string, player: PlayerModel | null): void;
  }
}
