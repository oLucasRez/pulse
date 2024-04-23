import { LightSpotModel } from '@domain/models';

export interface ISetLightSpotLandmarkUsecase {
  execute(landmarkID: string): Promise<LightSpotModel>;
}
