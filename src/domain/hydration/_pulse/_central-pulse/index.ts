import { CentralPulseModel, PulseModel } from '@domain/models';

import {
  CentralFactCollection,
  CentralPulseCollection,
} from '@domain/collections';

import { Vector } from '@domain/utils';

import { PulseHydrator } from '..';

export class CentralPulseHydrator {
  public static hydrate(json: CentralPulseModel.JSON): CentralPulseModel {
    const centralPulse: CentralPulseModel = Object.assign<
      PulseModel<any>,
      Omit<CentralPulseModel, keyof PulseModel<any>>
    >(PulseHydrator.hydrate(json), {
      origin: Vector.fromJSON(json.origin),
      gap: json.gap,
      amount: json.amount,
      landmark: CentralFactCollection.get(json.landmarkID),
    });

    const collection = CentralPulseCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], centralPulse);
    else collection[json.id] = centralPulse;

    return centralPulse;
  }
}
