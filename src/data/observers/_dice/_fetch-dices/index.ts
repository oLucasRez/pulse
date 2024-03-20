import { DiceModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchDicesObserver {
  export interface Subscriber {
    onFetchDices(players: DiceModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchDices(players: DiceModel[]): void;
  }
}
