import { UserModel } from '@domain/models';

export namespace AuthObserver {
  export interface Subscriber {
    onSignIn(me: UserModel): void;
    onSignOut(): void;
    onFetchMe(me: UserModel | null): void;
    onChangeMe(me: UserModel): void;
  }

  export interface Publisher {
    notifySignIn(me: UserModel): void;
    notifySignOut(): void;
    notifyFetchMe(me: UserModel | null): void;
    notifyChangeMe(me: UserModel): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
