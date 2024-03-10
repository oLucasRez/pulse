import { PlayerModel } from '@domain/models';

import { FetchPlayersObserver, Publisher } from '@data/observers';

export class FetchPlayersPublisher
  extends Publisher<FetchPlayersObserver.Subscriber>
  implements FetchPlayersObserver.Publisher
{
  public notifyFetchPlayers(players: PlayerModel[]): void {
    this.subscribers.map((subscriber) => subscriber.onFetchPlayers(players));
  }
}
