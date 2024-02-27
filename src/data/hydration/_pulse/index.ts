import { LandmarkModel, Model, PulseModel } from '@domain/models';

import { LandmarkCollection, PulseCollection } from '@data/collections';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class PulseHydrator {
  public static hydrate(json: PulseModel.JSON): PulseModel<LandmarkModel> {
    const pulse: PulseModel<LandmarkModel> = Object.assign<
      Model,
      Omit<PulseModel<LandmarkModel>, keyof Model>
    >(ModelHydrator.hydrate(json), {
      origin: Vector.fromJSON(json.origin),
      gap: json.gap,
      amount: json.amount,
      landmark: LandmarkCollection.get(json.landmarkID),
    });

    PulseCollection.append(json.id, pulse);

    return pulse;
  }
}

export * from './_central-pulse';
