import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace StartGameObserver {
  export interface Subscriber {
    onStartGame(game: GameModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyStartGame(game: GameModel): void;
  }
}
