import { PlayerModel } from '@domain/models';

import { PlayerObserver } from '@data/observers';

export class PlayerPublisher implements PlayerObserver.Publisher {
  public notifyFetchPlayers(players: PlayerModel[]): void {
    PlayerPublisher.subscribers.map((subscriber) =>
      subscriber.onFetchPlayers(players),
    );
  }

  public notifyFetchPlayer(id: string, player: PlayerModel | null): void {
    PlayerPublisher.subscribers.map((subscriber) =>
      subscriber.onFetchPlayer(id, player),
    );
  }

  public notifyCreatePlayer(player: PlayerModel): void {
    PlayerPublisher.subscribers.map((subscriber) =>
      subscriber.onCreatePlayer(player),
    );
  }

  public notifyChangePlayer(player: PlayerModel): void {
    PlayerPublisher.subscribers.map((subscriber) =>
      subscriber.onChangePlayer(player),
    );
  }

  public notifyDeletePlayer(id: string): void {
    PlayerPublisher.subscribers.map((subscriber) =>
      subscriber.onDeletePlayer(id),
    );
  }

  public notifyBanPlayer(player: PlayerModel): void {
    PlayerPublisher.subscribers.map((subscriber) =>
      subscriber.onBanPlayer(player),
    );
  }

  private static subscribers: PlayerObserver.Subscriber[] = [];

  public subscribe(subscriber: PlayerObserver.Subscriber): void {
    PlayerPublisher.subscribers.push(subscriber);
  }
  public unsubscribe(subscriber: PlayerObserver.Subscriber): void {
    PlayerPublisher.subscribers.splice(
      PlayerPublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
