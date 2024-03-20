import { DiceModel } from '@domain/models';

import { FetchDiceObserver, Publisher } from '@data/observers';

export class FetchDicePublisher
  extends Publisher<FetchDiceObserver.Subscriber>
  implements FetchDiceObserver.Publisher
{
  public notifyFetchDice(id: string, dice: DiceModel | null): void {
    this.subscribers.map((subscriber) => subscriber.onFetchDice(id, dice));
  }
}
