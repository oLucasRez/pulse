import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeGameObserver {
  export interface Subscriber {
    onChangeGame(game: GameModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeGame(game: GameModel): void;
  }
}
