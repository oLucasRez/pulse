import { CentralPulseModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeCentralPulseObserver {
  export interface Subscriber {
    onChangeCentralPulse(centralPulse: CentralPulseModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeCentralPulse(centralPulse: CentralPulseModel): void;
  }
}
