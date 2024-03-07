import { UserModel } from '@domain/models';

export namespace AuthObserver {
  export interface Subscriber {
    onMeChange(me: UserModel | null): void;
  }

  export interface Publisher {
    notifyMeChange(me: UserModel | null): void;
    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
