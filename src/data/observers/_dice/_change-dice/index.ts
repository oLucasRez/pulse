import { DiceModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeDiceObserver {
  export interface Subscriber {
    onChangeDice(dice: DiceModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeDice(dice: DiceModel): void;
  }
}
