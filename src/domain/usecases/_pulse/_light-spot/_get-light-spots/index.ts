import { LightSpotModel } from '@domain/models';

export interface IGetLightSpotsUsecase {
  execute(): Promise<LightSpotModel[]>;
}
