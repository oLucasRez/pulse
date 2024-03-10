import { GameModel } from '@domain/models';

import { FetchGameObserver, Publisher } from '@data/observers';

export class FetchGamePublisher
  extends Publisher<FetchGameObserver.Subscriber>
  implements FetchGameObserver.Publisher
{
  public notifyFetchGame(id: string, game: GameModel | null): void {
    this.subscribers.map((subscriber) => subscriber.onFetchGame(id, game));
  }
}
