import { BasePublisher } from '@data/observers';

export namespace SignOutObserver {
  export interface Subscriber {
    onSignOut(): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifySignOut(): void;
  }
}
