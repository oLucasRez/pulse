import { PulseModel, SubjectPulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { SubjectPulseDAO } from '@data/dao';

import { PulseHydrator } from '..';

export class SubjectPulseHydrator {
  public static hydrate(dto: SubjectPulseDAO.DTO): SubjectPulseModel {
    const centralPulse: SubjectPulseModel = Object.assign<
      PulseModel<any>,
      Omit<SubjectPulseModel, keyof PulseModel<any>>
    >(PulseHydrator.hydrate(dto), {
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      landmark: dto.landmarkID,
    });

    return centralPulse;
  }
}
