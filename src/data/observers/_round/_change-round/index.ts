import { RoundModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeRoundObserver {
  export interface Subscriber {
    onChangeRound(round: RoundModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeRound(round: RoundModel): void;
  }
}
