import { UserModel } from '@domain/models';

export namespace ChangeMeObserver {
  export interface Subscriber {
    onChangeMe(me: UserModel): void;
  }

  export interface Publisher {
    notifyChangeMe(me: UserModel): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
