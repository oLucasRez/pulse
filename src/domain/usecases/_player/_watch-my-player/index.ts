import { PlayerModel } from '@domain/models';

export interface IWatchMyPlayerUsecase {
  execute(
    callback: IWatchMyPlayerUsecase.Callback,
  ): Promise<IWatchMyPlayerUsecase.Response>;
}

export namespace IWatchMyPlayerUsecase {
  export type Callback = (myPlayer: PlayerModel | null) => void;
  export type Response = () => void;
}
