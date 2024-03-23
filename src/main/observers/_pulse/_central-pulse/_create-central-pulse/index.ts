import { CentralPulseModel } from '@domain/models';

import { CreateCentralPulseObserver, Publisher } from '@data/observers';

export class CreateCentralPulsePublisher
  extends Publisher<CreateCentralPulseObserver.Subscriber>
  implements CreateCentralPulseObserver.Publisher
{
  public notifyCreateCentralPulse(centralPulse: CentralPulseModel): void {
    this.subscribers.map((subscriber) =>
      subscriber.onCreateCentralPulse(centralPulse),
    );
  }
}
