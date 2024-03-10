import { UserModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace SignInObserver {
  export interface Subscriber {
    onSignIn(me: UserModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifySignIn(me: UserModel): void;
  }
}
