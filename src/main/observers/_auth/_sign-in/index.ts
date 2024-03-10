import { UserModel } from '@domain/models';

import { SignInObserver } from '@data/observers';

export class SignInPublisher implements SignInObserver.Publisher {
  public notifySignIn(me: UserModel): void {
    SignInPublisher.subscribers.map((subscriber) => subscriber.onSignIn(me));
  }

  private static subscribers: SignInObserver.Subscriber[] = [];

  public subscribe(subscriber: SignInObserver.Subscriber): void {
    SignInPublisher.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: SignInObserver.Subscriber): void {
    SignInPublisher.subscribers.splice(
      SignInPublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
