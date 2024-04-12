import { RoundModel } from '@domain/models';

export interface IWatchRoundsUsecase {
  execute(
    callback: IWatchRoundsUsecase.Callback,
  ): Promise<IWatchRoundsUsecase.Response>;
}

export namespace IWatchRoundsUsecase {
  export type Callback = (rounds: RoundModel[]) => void;
  export type Response = () => void;
}
