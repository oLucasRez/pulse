import { UserModel } from '@domain/models';

import { FetchMeObserver } from '@data/observers';

export class FetchMePublisher implements FetchMeObserver.Publisher {
  public notifyFetchMe(me: UserModel | null): void {
    FetchMePublisher.subscribers.map((subscriber) => subscriber.onFetchMe(me));
  }

  private static subscribers: FetchMeObserver.Subscriber[] = [];

  public subscribe(subscriber: FetchMeObserver.Subscriber): void {
    FetchMePublisher.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: FetchMeObserver.Subscriber): void {
    FetchMePublisher.subscribers.splice(
      FetchMePublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
