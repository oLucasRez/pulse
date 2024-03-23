import { CentralPulseModel } from '@domain/models';

import { ChangeCentralPulseObserver, Publisher } from '@data/observers';

export class ChangeCentralPulsePublisher
  extends Publisher<ChangeCentralPulseObserver.Subscriber>
  implements ChangeCentralPulseObserver.Publisher
{
  public notifyChangeCentralPulse(centralPulse: CentralPulseModel): void {
    this.subscribers.map((subscriber) =>
      subscriber.onChangeCentralPulse(centralPulse),
    );
  }
}
