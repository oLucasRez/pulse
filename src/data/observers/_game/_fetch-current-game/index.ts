import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchCurrentGameObserver {
  export interface Subscriber {
    onFetchCurrentGame(currentGame: GameModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchCurrentGame(currentGame: GameModel | null): void;
  }
}
