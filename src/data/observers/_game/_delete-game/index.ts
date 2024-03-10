import { BasePublisher } from '@data/observers';

export namespace DeleteGameObserver {
  export interface Subscriber {
    onDeleteGame(id: string): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyDeleteGame(id: string): void;
  }
}
