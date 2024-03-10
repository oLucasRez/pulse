import { PlayerModel } from '@domain/models';

import { CreatePlayerObserver, Publisher } from '@data/observers';

export class CreatePlayerPublisher
  extends Publisher<CreatePlayerObserver.Subscriber>
  implements CreatePlayerObserver.Publisher
{
  public notifyCreatePlayer(player: PlayerModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreatePlayer(player));
  }
}
