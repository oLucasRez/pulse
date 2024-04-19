import { SubjectPulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { ISubjectPulseHydrator } from '@data/hydration';

export class SubjectPulseHydrator implements ISubjectPulseHydrator {
  public async hydrate(dto: SubjectPulseModel.DTO): Promise<SubjectPulseModel> {
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
