import { UserModel } from '@domain/models';

import { FetchMeObserver, Publisher } from '@data/observers';

export class FetchMePublisher
  extends Publisher<FetchMeObserver.Subscriber>
  implements FetchMeObserver.Publisher
{
  public notifyFetchMe(me: UserModel | null): void {
    this.subscribers.map((subscriber) => subscriber.onFetchMe(me));
  }
}
