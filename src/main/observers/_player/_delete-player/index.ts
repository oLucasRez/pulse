import { DeletePlayerObserver, Publisher } from '@data/observers';

export class DeletePlayerPublisher
  extends Publisher<DeletePlayerObserver.Subscriber>
  implements DeletePlayerObserver.Publisher
{
  public notifyDeletePlayer(id: string): void {
    this.subscribers.map((subscriber) => subscriber.onDeletePlayer(id));
  }
}
