import {
  GetMyPlayerUsecase,
  WatchMyPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

export class DAOWatchMyPlayerUsecase implements WatchMyPlayerUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly watchPlayers: WatchPlayersUsecase;

  public constructor(deps: DAOWatchMyPlayerUsecase.Deps) {
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

          callback(myPlayerSnapshot ?? null);
        })
        .catch(() => {}),
    );

    return unsubscribe;
  }
}

export namespace DAOWatchMyPlayerUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    watchPlayers: WatchPlayersUsecase;
  };
}
