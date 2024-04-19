import {
  IGetMyPlayerUsecase,
  IWatchMyPlayerUsecase,
  IWatchPlayersUsecase,
} from '@domain/usecases';

export class WatchMyPlayerUsecase implements IWatchMyPlayerUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly watchPlayers: IWatchPlayersUsecase;
  public constructor({ getMyPlayer, watchPlayers }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.watchPlayers = watchPlayers;
  }

  public async execute(
    callback: IWatchMyPlayerUsecase.Callback,
  ): Promise<IWatchMyPlayerUsecase.Response> {
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

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  watchPlayers: IWatchPlayersUsecase;
};
