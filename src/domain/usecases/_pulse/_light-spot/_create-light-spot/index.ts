import { LightSpotModel } from '@domain/models';

export interface ICreateLightSpotUsecase {
  execute(): Promise<LightSpotModel>;
}
