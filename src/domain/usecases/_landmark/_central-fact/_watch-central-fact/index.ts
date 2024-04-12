import { CentralFactModel } from '@domain/models';

export interface IWatchCentralFactUsecase {
  execute(
    callback: IWatchCentralFactUsecase.Callback,
  ): Promise<IWatchCentralFactUsecase.Response>;
}

export namespace IWatchCentralFactUsecase {
  export type Callback = (centralFact: CentralFactModel | null) => void;
  export type Response = () => void;
}
