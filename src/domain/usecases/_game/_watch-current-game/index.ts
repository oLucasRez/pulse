import { GameModel } from '@domain/models';

export interface WatchCurrentGameUsecase {
  execute(
    callback: WatchCurrentGameUsecase.Callback,
  ): Promise<WatchCurrentGameUsecase.Response>;
}

export namespace WatchCurrentGameUsecase {
  export type Callback = (currentGame: GameModel | null) => void;
  export type Response = () => void;
}
