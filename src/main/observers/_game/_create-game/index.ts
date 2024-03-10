import { GameModel } from '@domain/models';

import { CreateGameObserver, Publisher } from '@data/observers';

export class CreateGamePublisher
  extends Publisher<CreateGameObserver.Subscriber>
  implements CreateGameObserver.Publisher
{
  public notifyCreateGame(game: GameModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreateGame(game));
  }
}
