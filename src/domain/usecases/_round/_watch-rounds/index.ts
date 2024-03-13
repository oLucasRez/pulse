import { RoundModel } from '@domain/models';

export interface WatchRoundsUsecase {
  execute(
    callback: WatchRoundsUsecase.Callback,
  ): Promise<WatchRoundsUsecase.Response>;
}

export namespace WatchRoundsUsecase {
  export type Callback = (rounds: RoundModel[]) => void;
  export type Response = () => void;
}
