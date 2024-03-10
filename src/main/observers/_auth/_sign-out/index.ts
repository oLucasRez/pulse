import { SignOutObserver } from '@data/observers';

export class SignOutPublisher implements SignOutObserver.Publisher {
  public notifySignOut(): void {
    SignOutPublisher.subscribers.map((subscriber) => subscriber.onSignOut());
  }

  private static subscribers: SignOutObserver.Subscriber[] = [];

  public subscribe(subscriber: SignOutObserver.Subscriber): void {
    SignOutPublisher.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: SignOutObserver.Subscriber): void {
    SignOutPublisher.subscribers.splice(
      SignOutPublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
