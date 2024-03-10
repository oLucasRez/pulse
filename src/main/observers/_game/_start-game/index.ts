import { GameModel } from '@domain/models';

import { Publisher, StartGameObserver } from '@data/observers';

export class StartGamePublisher
  extends Publisher<StartGameObserver.Subscriber>
  implements StartGameObserver.Publisher
{
  public notifyStartGame(game: GameModel): void {
    this.subscribers.map((subscriber) => subscriber.onStartGame(game));
  }
}
