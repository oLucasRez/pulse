import { PlayerModel } from '@domain/models';

import { ChangePlayerObserver, Publisher } from '@data/observers';

export class ChangePlayerPublisher
  extends Publisher<ChangePlayerObserver.Subscriber>
  implements ChangePlayerObserver.Publisher
{
  public notifyChangePlayer(player: PlayerModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangePlayer(player));
  }
}
