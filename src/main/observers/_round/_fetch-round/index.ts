import { RoundModel } from '@domain/models';

import { FetchRoundObserver, Publisher } from '@data/observers';

export class FetchRoundPublisher
  extends Publisher<FetchRoundObserver.Subscriber>
  implements FetchRoundObserver.Publisher
{
  public notifyFetchRound(id: string, round: RoundModel | null): void {
    this.subscribers.map((subscriber) => subscriber.onFetchRound(id, round));
  }
}
