import { CentralFactModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchCentralFactObserver {
  export interface Subscriber {
    onFetchCentralFact(centralFact: CentralFactModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchCentralFact(centralFact: CentralFactModel | null): void;
  }
}
