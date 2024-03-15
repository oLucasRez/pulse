import { CentralFactModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeCentralFactObserver {
  export interface Subscriber {
    onChangeCentralFact(centralFact: CentralFactModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeCentralFact(centralFact: CentralFactModel): void;
  }
}
