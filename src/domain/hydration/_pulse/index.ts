import { LandmarkModel, PulseModel } from '@domain/models';

import { LandmarkCollection, PulseCollection } from '@domain/collections';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class PulseHydrator {
  public static hydrate(json: PulseModel.JSON): PulseModel<LandmarkModel> {
    const landmarkCollection = LandmarkCollection.getCollection();

    const pulse: PulseModel<LandmarkModel> = Object.assign(
      ModelHydrator.hydrate(json),
      {
        origin: Vector.fromJSON(json.origin),
        gap: json.gap,
        amount: json.amount,
        landmark: landmarkCollection[json.landmarkID],
      },
    );

    const collection = PulseCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], pulse);
    else collection[json.id] = pulse;

    return pulse;
  }
}

export * from './_central-pulse';
