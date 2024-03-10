import { GameModel } from '@domain/models';

import { ChangeGameObserver, Publisher } from '@data/observers';

export class ChangeGamePublisher
  extends Publisher<ChangeGameObserver.Subscriber>
  implements ChangeGameObserver.Publisher
{
  public notifyChangeGame(game: GameModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangeGame(game));
  }
}
