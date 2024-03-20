import { DiceModel } from '@domain/models';

import { CreateDiceObserver, Publisher } from '@data/observers';

export class CreateDicePublisher
  extends Publisher<CreateDiceObserver.Subscriber>
  implements CreateDiceObserver.Publisher
{
  public notifyCreateDice(dice: DiceModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreateDice(dice));
  }
}
