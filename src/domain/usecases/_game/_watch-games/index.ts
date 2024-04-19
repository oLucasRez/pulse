import { GameModel } from '@domain/models';

export interface IWatchGamesUsecase {
  execute(
    callback: IWatchGamesUsecase.Callback,
  ): Promise<IWatchGamesUsecase.Response>;
}

export namespace IWatchGamesUsecase {
  export type Callback = (games: GameModel[]) => void;
  export type Response = () => void;
}
