import { CentralFactModel } from '@domain/models';

import { ChangeCentralFactObserver, Publisher } from '@data/observers';

export class ChangeCentralFactPublisher
  extends Publisher<ChangeCentralFactObserver.Subscriber>
  implements ChangeCentralFactObserver.Publisher
{
  public notifyChangeCentralFact(centralFact: CentralFactModel): void {
    this.subscribers.map((subscriber) =>
      subscriber.onChangeCentralFact(centralFact),
    );
  }
}
