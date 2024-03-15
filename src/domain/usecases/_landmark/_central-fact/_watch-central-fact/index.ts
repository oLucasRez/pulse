import { CentralFactModel } from '@domain/models';

export interface WatchCentralFactUsecase {
  execute(
    callback: WatchCentralFactUsecase.Callback,
  ): Promise<WatchCentralFactUsecase.Response>;
}

export namespace WatchCentralFactUsecase {
  export type Callback = (centralFact: CentralFactModel | null) => void;
  export type Response = () => void;
}
