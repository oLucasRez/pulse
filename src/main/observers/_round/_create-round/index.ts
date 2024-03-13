import { RoundModel } from '@domain/models';

import { CreateRoundObserver, Publisher } from '@data/observers';

export class CreateRoundPublisher
  extends Publisher<CreateRoundObserver.Subscriber>
  implements CreateRoundObserver.Publisher
{
  public notifyCreateRound(round: RoundModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreateRound(round));
  }
}
