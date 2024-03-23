import { CentralPulseModel } from '@domain/models';

export interface WatchCentralPulseUsecase {
  execute(
    callback: WatchCentralPulseUsecase.Callback,
  ): Promise<WatchCentralPulseUsecase.Response>;
}

export namespace WatchCentralPulseUsecase {
  export type Callback = (centralPulse: CentralPulseModel | null) => void;
  export type Response = () => void;
}
