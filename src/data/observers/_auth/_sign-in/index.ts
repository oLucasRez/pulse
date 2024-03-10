import { UserModel } from '@domain/models';

export namespace SignInObserver {
  export interface Subscriber {
    onSignIn(me: UserModel): void;
  }

  export interface Publisher {
    notifySignIn(me: UserModel): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
