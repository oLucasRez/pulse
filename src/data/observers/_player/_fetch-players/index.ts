import { PlayerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchPlayersObserver {
  export interface Subscriber {
    onFetchPlayers(players: PlayerModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchPlayers(players: PlayerModel[]): void;
  }
}
