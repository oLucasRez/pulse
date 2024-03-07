import { PlayerModel } from '@domain/models';

export namespace PlayerObserver {
  export interface Subscriber {
    onFetchPlayers(players: PlayerModel[]): void;
    onFetchPlayer(player: PlayerModel | null): void;
    onFetchMyPlayer(player: PlayerModel | null): void;
    onFetchCurrentPlayer(player: PlayerModel | null): void;
    onCreatePlayer(player: PlayerModel): void;
    onChangePlayer(player: PlayerModel): void;
    onDeletePlayer(id: string): void;
    onBanPlayer(player: PlayerModel): void;
  }

  export interface Publisher {
    notifyFetchPlayers(players: PlayerModel[]): void;
    notifyFetchPlayer(player: PlayerModel | null): void;
    notifyFetchMyPlayer(player: PlayerModel | null): void;
    notifyFetchCurrentPlayer(player: PlayerModel | null): void;
    notifyCreatePlayer(player: PlayerModel): void;
    notifyChangePlayer(player: PlayerModel): void;
    notifyDeletePlayer(id: string): void;
    notifyBanPlayer(player: PlayerModel): void;
    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
