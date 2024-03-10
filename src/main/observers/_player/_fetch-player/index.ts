import { PlayerModel } from '@domain/models';

import { FetchPlayerObserver, Publisher } from '@data/observers';

export class FetchPlayerPublisher
  extends Publisher<FetchPlayerObserver.Subscriber>
  implements FetchPlayerObserver.Publisher
{
  public notifyFetchPlayer(id: string, player: PlayerModel | null): void {
    this.subscribers.map((subscriber) => subscriber.onFetchPlayer(id, player));
  }
}
