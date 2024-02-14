import { PlayerModel } from '@domain/models';

export interface WatchMyPlayerUsecase {
  execute(
    callback: WatchMyPlayerUsecase.Callback,
  ): Promise<WatchMyPlayerUsecase.Response>;
}

export namespace WatchMyPlayerUsecase {
  export type Callback = (myPlayer: PlayerModel | null) => void;
  export type Response = () => void;
}
