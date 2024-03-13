import { RoundModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchRoundsObserver {
  export interface Subscriber {
    onFetchRounds(rounds: RoundModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchRounds(rounds: RoundModel[]): void;
  }
}
