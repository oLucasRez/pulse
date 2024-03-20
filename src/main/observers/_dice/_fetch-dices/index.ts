import { DiceModel } from '@domain/models';

import { FetchDicesObserver, Publisher } from '@data/observers';

export class FetchDicesPublisher
  extends Publisher<FetchDicesObserver.Subscriber>
  implements FetchDicesObserver.Publisher
{
  public notifyFetchDices(dices: DiceModel[]): void {
    this.subscribers.map((subscriber) => subscriber.onFetchDices(dices));
  }
}
