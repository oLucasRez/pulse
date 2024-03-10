import { PlayerModel } from '@domain/models';

import { BanPlayerObserver, Publisher } from '@data/observers';

export class BanPlayerPublisher
  extends Publisher<BanPlayerObserver.Subscriber>
  implements BanPlayerObserver.Publisher
{
  public notifyBanPlayer(player: PlayerModel): void {
    this.subscribers.map((subscriber) => subscriber.onBanPlayer(player));
  }
}
