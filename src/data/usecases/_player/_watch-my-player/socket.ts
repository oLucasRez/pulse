import {
  GetMyPlayerUsecase,
  WatchMyPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

export class SocketWatchMyPlayerUsecase implements WatchMyPlayerUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly watchPlayers: WatchPlayersUsecase;

  public constructor(deps: SocketWatchMyPlayerUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.watchPlayers = deps.watchPlayers;
  }

  public async execute(
    callback: WatchMyPlayerUsecase.Callback,
  ): Promise<WatchMyPlayerUsecase.Response> {
    const unsubscribe = await this.watchPlayers.execute((players) =>
      this.getMyPlayer
        .execute()
        .then((myPlayer) => {
          const myPlayerSnapshot = players.find(
            (player) => player.id === myPlayer?.id,
          );

          if (myPlayerSnapshot) callback(myPlayerSnapshot);
        })
        .catch(() => {}),
    );

    return unsubscribe;
  }
}

export namespace SocketWatchMyPlayerUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    watchPlayers: WatchPlayersUsecase;
  };
}
