import { DiceModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchDicesObserver {
  export interface Subscriber {
    onFetchDices(dices: DiceModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchDices(dices: DiceModel[]): void;
  }
}
