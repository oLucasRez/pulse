import { DiceModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchDiceObserver {
  export interface Subscriber {
    onFetchDice(id: string, dice: DiceModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchDice(id: string, dice: DiceModel | null): void;
  }
}
