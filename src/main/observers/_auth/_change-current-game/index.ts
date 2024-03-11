import { GameModel } from '@domain/models';

import { ChangeCurrentGameObserver, Publisher } from '@data/observers';

export class ChangeCurrentGamePublisher
  extends Publisher<ChangeCurrentGameObserver.Subscriber>
  implements ChangeCurrentGameObserver.Publisher
{
  public notifyChangeCurrentGame(currentGame: GameModel | null): void {
    this.subscribers.map((subscriber) =>
      subscriber.onChangeCurrentGame(currentGame),
    );
  }
}
