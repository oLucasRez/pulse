import { UserModel } from '@domain/models';

import { ChangeMeObserver } from '@data/observers';

export class ChangeMePublisher implements ChangeMeObserver.Publisher {
  public notifyChangeMe(me: UserModel): void {
    ChangeMePublisher.subscribers.map((subscriber) =>
      subscriber.onChangeMe(me),
    );
  }

  private static subscribers: ChangeMeObserver.Subscriber[] = [];

  public subscribe(subscriber: ChangeMeObserver.Subscriber): void {
    ChangeMePublisher.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: ChangeMeObserver.Subscriber): void {
    ChangeMePublisher.subscribers.splice(
      ChangeMePublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
