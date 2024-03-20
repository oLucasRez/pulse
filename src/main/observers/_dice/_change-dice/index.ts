import { DiceModel } from '@domain/models';

import { ChangeDiceObserver, Publisher } from '@data/observers';

export class ChangeDicePublisher
  extends Publisher<ChangeDiceObserver.Subscriber>
  implements ChangeDiceObserver.Publisher
{
  public notifyChangeDice(dice: DiceModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangeDice(dice));
  }
}
