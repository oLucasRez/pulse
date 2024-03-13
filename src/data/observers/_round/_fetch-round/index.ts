import { RoundModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchRoundObserver {
  export interface Subscriber {
    onFetchRound(id: string, round: RoundModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchRound(id: string, round: RoundModel | null): void;
  }
}
