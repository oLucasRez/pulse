import { GameModel } from '@domain/models';

export namespace GameObserver {
  export interface Subscriber {
    onFetchGames(games: GameModel[]): void;
    onFetchGame(id: string, game: GameModel | null): void;
    onCreateGame(game: GameModel): void;
    onChangeGame(game: GameModel): void;
    onDeleteGame(id: string): void;
    onStartGame(game: GameModel): void;
  }

  export interface Publisher {
    notifyFetchGames(games: GameModel[]): void;
    notifyFetchGame(id: string, game: GameModel | null): void;
    notifyCreateGame(game: GameModel): void;
    notifyChangeGame(game: GameModel): void;
    notifyDeleteGame(id: string): void;
    notifyStartGame(game: GameModel): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
