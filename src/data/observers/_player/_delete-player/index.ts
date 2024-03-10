import { BasePublisher } from '@data/observers';

export namespace DeletePlayerObserver {
  export interface Subscriber {
    onDeletePlayer(id: string): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyDeletePlayer(id: string): void;
  }
}
