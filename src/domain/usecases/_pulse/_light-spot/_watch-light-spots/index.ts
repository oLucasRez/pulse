import { LightSpotModel } from '@domain/models';

export interface IWatchLightSpotsUsecase {
  execute(
    callback: IWatchLightSpotsUsecase.Callback,
  ): Promise<IWatchLightSpotsUsecase.Response>;
}

export namespace IWatchLightSpotsUsecase {
  export type Callback = (lightSpots: LightSpotModel[]) => void;
  export type Response = () => void;
}
