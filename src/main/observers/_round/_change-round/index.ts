import { RoundModel } from '@domain/models';

import { ChangeRoundObserver, Publisher } from '@data/observers';

export class ChangeRoundPublisher
  extends Publisher<ChangeRoundObserver.Subscriber>
  implements ChangeRoundObserver.Publisher
{
  public notifyChangeRound(round: RoundModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangeRound(round));
  }
}
