export class Publisher<S> {
  protected subscribers: S[] = [];

  public subscribe(subscriber: S): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: S): void {
    this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
  }
}

export interface BasePublisher<S> {
  subscribe(subscriber: S): void;
  unsubscribe(subscriber: S): void;
}
