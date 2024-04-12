import { CentralPulseModel } from '@domain/models';

export interface IWatchCentralPulseUsecase {
  execute(
    callback: IWatchCentralPulseUsecase.Callback,
  ): Promise<IWatchCentralPulseUsecase.Response>;
}

export namespace IWatchCentralPulseUsecase {
  export type Callback = (centralPulse: CentralPulseModel | null) => void;
  export type Response = () => void;
}
