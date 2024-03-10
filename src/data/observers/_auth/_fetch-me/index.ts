import { UserModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchMeObserver {
  export interface Subscriber {
    onFetchMe(me: UserModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchMe(me: UserModel | null): void;
  }
}
