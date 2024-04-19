import { LightSpotModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { ILightSpotHydrator } from '@data/hydration';

export class LightSpotHydrator implements ILightSpotHydrator {
  public async hydrate(dto: LightSpotModel.DTO): Promise<LightSpotModel> {
    return {
      id: dto.id,
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      landmarkID: dto.landmarkID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
