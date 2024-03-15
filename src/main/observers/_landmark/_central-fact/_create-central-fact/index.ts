import { CentralFactModel } from '@domain/models';

import { CreateCentralFactObserver, Publisher } from '@data/observers';

export class CreateCentralFactPublisher
  extends Publisher<CreateCentralFactObserver.Subscriber>
  implements CreateCentralFactObserver.Publisher
{
  public notifyCreateCentralFact(centralFact: CentralFactModel): void {
    this.subscribers.map((subscriber) =>
      subscriber.onCreateCentralFact(centralFact),
    );
  }
}
