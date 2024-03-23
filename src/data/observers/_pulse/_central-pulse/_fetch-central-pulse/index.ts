import { CentralPulseModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchCentralPulseObserver {
  export interface Subscriber {
    onFetchCentralPulse(centralPulse: CentralPulseModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchCentralPulse(centralPulse: CentralPulseModel | null): void;
  }
}
