import { RoundModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateRoundObserver {
  export interface Subscriber {
    onCreateRound(round: RoundModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateRound(round: RoundModel): void;
  }
}
