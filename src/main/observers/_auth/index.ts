import { UserModel } from '@domain/models';

import { AuthObserver } from '@data/observers';

export class AuthPublisher implements AuthObserver.Publisher {
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

  public notifyMeChange(me: UserModel | null): void {
    AuthPublisher.subscribers.map((subscriber) => subscriber.onMeChange(me));
  }
}

export * from './_signal';
