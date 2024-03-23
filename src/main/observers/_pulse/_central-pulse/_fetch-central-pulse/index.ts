import { CentralPulseModel } from '@domain/models';

import { FetchCentralPulseObserver, Publisher } from '@data/observers';

export class FetchCentralPulsePublisher
  extends Publisher<FetchCentralPulseObserver.Subscriber>
  implements FetchCentralPulseObserver.Publisher
{
  public notifyFetchCentralPulse(centralPulse: CentralPulseModel | null): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchCentralPulse(centralPulse),
    );
  }
}
