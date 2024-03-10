import { GameModel } from '@domain/models';

import { FetchGamesObserver, Publisher } from '@data/observers';

export class FetchGamesPublisher
  extends Publisher<FetchGamesObserver.Subscriber>
  implements FetchGamesObserver.Publisher
{
  public notifyFetchGames(games: GameModel[]): void {
    this.subscribers.map((subscriber) => subscriber.onFetchGames(games));
  }
}
