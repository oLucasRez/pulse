export namespace SignOutObserver {
  export interface Subscriber {
    onSignOut(): void;
  }

  export interface Publisher {
    notifySignOut(): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
