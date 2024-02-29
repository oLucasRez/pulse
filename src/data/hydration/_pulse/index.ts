import { LandmarkModel, Model, PulseModel } from '@domain/models';

import { LandmarkCollection, PulseCollection } from '@data/collections';

import { PulseCRUD } from '@data/cruds';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class PulseHydrator {
  public static hydrate(dto: PulseCRUD.DTO): PulseModel<LandmarkModel> {
    const pulse: PulseModel<LandmarkModel> = Object.assign<
      Model,
      Omit<PulseModel<LandmarkModel>, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      landmark: LandmarkCollection.get(dto.landmarkID),
    });

    PulseCollection.append(dto.id, pulse);

    return pulse;
  }
}

export * from './_central-pulse';
