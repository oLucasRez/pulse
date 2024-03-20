import { DiceModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateDiceObserver {
  export interface Subscriber {
    onCreateDice(dice: DiceModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateDice(dice: DiceModel): void;
  }
}
