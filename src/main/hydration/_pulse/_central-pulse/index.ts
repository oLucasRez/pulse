import { CentralPulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { ICentralPulseHydrator } from '@data/hydration';

export class CentralPulseHydrator implements ICentralPulseHydrator {
  public async hydrate(dto: CentralPulseModel.DTO): Promise<CentralPulseModel> {
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
