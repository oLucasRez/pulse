import { UserModel } from '@domain/models';

export namespace FetchMeObserver {
  export interface Subscriber {
    onFetchMe(me: UserModel | null): void;
  }

  export interface Publisher {
    notifyFetchMe(me: UserModel | null): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
