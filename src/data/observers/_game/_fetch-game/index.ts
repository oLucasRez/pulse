import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchGameObserver {
  export interface Subscriber {
    onFetchGame(id: string, game: GameModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchGame(id: string, game: GameModel | null): void;
  }
}
