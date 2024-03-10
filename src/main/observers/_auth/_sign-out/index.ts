import { Publisher, SignOutObserver } from '@data/observers';

export class SignOutPublisher
  extends Publisher<SignOutObserver.Subscriber>
  implements SignOutObserver.Publisher
{
  public notifySignOut(): void {
    this.subscribers.map((subscriber) => subscriber.onSignOut());
  }
}
