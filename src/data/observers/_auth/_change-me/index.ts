import { UserModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeMeObserver {
  export interface Subscriber {
    onChangeMe(me: UserModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeMe(me: UserModel): void;
  }
}
