import { LandmarkModel, Model, PulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { PulseDAO } from '@data/dao';

import { ModelHydrator } from '..';

export class PulseHydrator {
  public static hydrate(dto: PulseDAO.DTO): PulseModel<LandmarkModel> {
    const pulse: PulseModel<LandmarkModel> = Object.assign<
      Model,
      Omit<PulseModel<LandmarkModel>, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      landmarkID: dto.landmarkID,
    });

    return pulse;
  }
}

export * from './_central-pulse';
