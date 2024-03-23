import { CentralPulseModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateCentralPulseObserver {
  export interface Subscriber {
    onCreateCentralPulse(centralPulse: CentralPulseModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateCentralPulse(centralPulse: CentralPulseModel): void;
  }
}
