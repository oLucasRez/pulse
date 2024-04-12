import { GameModel } from '@domain/models';

export interface IWatchCurrentGameUsecase {
  execute(
    callback: IWatchCurrentGameUsecase.Callback,
  ): Promise<IWatchCurrentGameUsecase.Response>;
}

export namespace IWatchCurrentGameUsecase {
  export type Callback = (currentGame: GameModel | null) => void;
  export type Response = () => void;
}
