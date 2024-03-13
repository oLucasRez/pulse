import { RoundModel } from '@domain/models';

import { FetchRoundsObserver, Publisher } from '@data/observers';

export class FetchRoundsPublisher
  extends Publisher<FetchRoundsObserver.Subscriber>
  implements FetchRoundsObserver.Publisher
{
  public notifyFetchRounds(rounds: RoundModel[]): void {
    this.subscribers.map((subscriber) => subscriber.onFetchRounds(rounds));
  }
}
