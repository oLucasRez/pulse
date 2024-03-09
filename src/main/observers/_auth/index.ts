import { UserModel } from '@domain/models';

import { AuthObserver } from '@data/observers';

export class AuthPublisher implements AuthObserver.Publisher {
  public notifySignIn(me: UserModel): void {
    AuthPublisher.subscribers.map((subscriber) => subscriber.onSignIn(me));
  }

  public notifySignOut(): void {
    AuthPublisher.subscribers.map((subscriber) => subscriber.onSignOut());
  }

  public notifyFetchMe(me: UserModel | null): void {
    AuthPublisher.subscribers.map((subscriber) => subscriber.onFetchMe(me));
  }

  public notifyChangeMe(me: UserModel): void {
    AuthPublisher.subscribers.map((subscriber) => subscriber.onChangeMe(me));
  }

  private static subscribers: AuthObserver.Subscriber[] = [];

  public subscribe(subscriber: AuthObserver.Subscriber): void {
    AuthPublisher.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: AuthObserver.Subscriber): void {
    AuthPublisher.subscribers.splice(
      AuthPublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
