import { PlayerModel } from '@domain/models';

export namespace PlayerObserver {
  export interface Subscriber {
    onFetchPlayers(players: PlayerModel[]): void;
    onFetchPlayer(id: string, player: PlayerModel | null): void;
    onCreatePlayer(player: PlayerModel): void;
    onChangePlayer(player: PlayerModel): void;
    onDeletePlayer(id: string): void;
    onBanPlayer(player: PlayerModel): void;
  }

  export interface Publisher {
    notifyFetchPlayers(players: PlayerModel[]): void;
    notifyFetchPlayer(id: string, player: PlayerModel | null): void;
    notifyCreatePlayer(player: PlayerModel): void;
    notifyChangePlayer(player: PlayerModel): void;
    notifyDeletePlayer(id: string): void;
    notifyBanPlayer(player: PlayerModel): void;

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
  }
}
