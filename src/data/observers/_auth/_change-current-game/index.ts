import { GameModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeCurrentGameObserver {
  export interface Subscriber {
    onChangeCurrentGame(currentGame: GameModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeCurrentGame(currentGame: GameModel | null): void;
  }
}
