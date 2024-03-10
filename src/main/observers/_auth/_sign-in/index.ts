import { UserModel } from '@domain/models';

import { Publisher, SignInObserver } from '@data/observers';

export class SignInPublisher
  extends Publisher<SignInObserver.Subscriber>
  implements SignInObserver.Publisher
{
  public notifySignIn(me: UserModel): void {
    this.subscribers.map((subscriber) => subscriber.onSignIn(me));
  }
}
