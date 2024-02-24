import { CentralPulseModel } from '@domain/models';

import {
  CentralFactCollection,
  CentralPulseCollection,
} from '@domain/collections';

import { Vector } from '@domain/utils';

import { PulseHydrator } from '..';

export class CentralPulseHydrator {
  public static hydrate(json: CentralPulseModel.JSON): CentralPulseModel {
    const centralFactCollection = CentralFactCollection.getCollection();

    const centralPulse: CentralPulseModel = Object.assign(
      PulseHydrator.hydrate(json),
      {
        origin: Vector.fromJSON(json.origin),
        gap: json.gap,
        amount: json.amount,
        landmark: centralFactCollection[json.landmarkID],
      },
    );

    const collection = CentralPulseCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], centralPulse);
    else collection[json.id] = centralPulse;

    return centralPulse;
  }
}
