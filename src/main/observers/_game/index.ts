import { GameModel } from '@domain/models';

import { GameObserver } from '@data/observers';

export class GamePublisher implements GameObserver.Publisher {
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

  public notifyFetchGames(games: GameModel[]): void {
    GamePublisher.subscribers.map((subscriber) =>
      subscriber.onFetchGames(games),
    );
  }

  public notifyFetchGame(game: GameModel | null): void {
    GamePublisher.subscribers.map((subscriber) => subscriber.onFetchGame(game));
  }

  public notifyFetchCurrentGame(game: GameModel | null): void {
    GamePublisher.subscribers.map((subscriber) =>
      subscriber.onFetchCurrentGame(game),
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
}

export * from './_signal';
