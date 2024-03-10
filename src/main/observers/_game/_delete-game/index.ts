import { DeleteGameObserver, Publisher } from '@data/observers';

export class DeleteGamePublisher
  extends Publisher<DeleteGameObserver.Subscriber>
  implements DeleteGameObserver.Publisher
{
  public notifyDeleteGame(id: string): void {
    this.subscribers.map((subscriber) => subscriber.onDeleteGame(id));
  }
}
