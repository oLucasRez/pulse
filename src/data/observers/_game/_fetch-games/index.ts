import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchGamesObserver {
  export interface Subscriber {
    onFetchGames(games: GameModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchGames(games: GameModel[]): void;
  }
}
