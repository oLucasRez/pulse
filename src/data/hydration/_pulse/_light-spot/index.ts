import { LightSpotModel } from '@domain/models';

export interface ILightSpotHydrator {
  hydrate(dto: LightSpotModel.DTO): Promise<LightSpotModel>;
}
