import { GameModel } from '@domain/models';

import { GameObserver } from '@data/observers';

export class GamePublisher implements GameObserver.Publisher {
  public notifyFetchGames(games: GameModel[]): void {
    GamePublisher.subscribers.map((subscriber) =>
      subscriber.onFetchGames(games),
    );
  }

  public notifyFetchGame(id: string, game: GameModel | null): void {
    GamePublisher.subscribers.map((subscriber) =>
      subscriber.onFetchGame(id, game),
    );
  }

  public notifyCreateGame(game: GameModel): void {
    GamePublisher.subscribers.map((subscriber) =>
      subscriber.onCreateGame(game),
    );
  }

  public notifyChangeGame(game: GameModel): void {
    GamePublisher.subscribers.map((subscriber) =>
      subscriber.onChangeGame(game),
    );
  }

  public notifyDeleteGame(id: string): void {
    GamePublisher.subscribers.map((subscriber) => subscriber.onDeleteGame(id));
  }

  public notifyStartGame(game: GameModel): void {
    GamePublisher.subscribers.map((subscriber) => subscriber.onStartGame(game));
  }

  private static subscribers: GameObserver.Subscriber[] = [];

  public subscribe(subscriber: GameObserver.Subscriber): void {
    GamePublisher.subscribers.push(subscriber);
  }
  public unsubscribe(subscriber: GameObserver.Subscriber): void {
    GamePublisher.subscribers.splice(
      GamePublisher.subscribers.indexOf(subscriber),
      1,
    );
  }
}
