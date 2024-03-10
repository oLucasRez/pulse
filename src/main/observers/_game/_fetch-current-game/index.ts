import { GameModel } from '@domain/models';

import { FetchCurrentGameObserver, Publisher } from '@data/observers';

export class FetchCurrentGamePublisher
  extends Publisher<FetchCurrentGameObserver.Subscriber>
  implements FetchCurrentGameObserver.Publisher
{
  public notifyFetchCurrentGame(currentGame: GameModel | null): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchCurrentGame(currentGame),
    );
  }
}
