import { UserModel } from '@domain/models';

import { ChangeMeObserver, Publisher } from '@data/observers';

export class ChangeMePublisher
  extends Publisher<ChangeMeObserver.Subscriber>
  implements ChangeMeObserver.Publisher
{
  public notifyChangeMe(me: UserModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangeMe(me));
  }
}
