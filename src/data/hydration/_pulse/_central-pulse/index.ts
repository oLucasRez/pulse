import { CentralPulseModel, PulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { CentralPulseDAO } from '@data/dao';

import { PulseHydrator } from '..';

export class CentralPulseHydrator {
  public static hydrate(dto: CentralPulseDAO.DTO): CentralPulseModel {
    const centralPulse: CentralPulseModel = Object.assign<
      PulseModel<any>,
      Omit<CentralPulseModel, keyof PulseModel<any>>
    >(PulseHydrator.hydrate(dto), {
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      landmark: dto.landmarkID,
    });

    return centralPulse;
  }
}
