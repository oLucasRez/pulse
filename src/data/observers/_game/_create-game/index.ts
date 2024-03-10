import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateGameObserver {
  export interface Subscriber {
    onCreateGame(game: GameModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateGame(game: GameModel): void;
  }
}
