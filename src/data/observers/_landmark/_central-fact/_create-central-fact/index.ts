import { CentralFactModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateCentralFactObserver {
  export interface Subscriber {
    onCreateCentralFact(centralFact: CentralFactModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateCentralFact(centralFact: CentralFactModel): void;
  }
}
