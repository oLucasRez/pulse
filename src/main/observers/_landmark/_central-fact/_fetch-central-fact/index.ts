import { CentralFactModel } from '@domain/models';

import { FetchCentralFactObserver, Publisher } from '@data/observers';

export class FetchCentralFactPublisher
  extends Publisher<FetchCentralFactObserver.Subscriber>
  implements FetchCentralFactObserver.Publisher
{
  public notifyFetchCentralFact(centralFact: CentralFactModel | null): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchCentralFact(centralFact),
    );
  }
}
