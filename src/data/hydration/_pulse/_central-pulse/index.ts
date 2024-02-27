import { CentralPulseModel, PulseModel } from '@domain/models';

import {
  CentralFactCollection,
  CentralPulseCollection,
} from '@data/collections';

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

    CentralPulseCollection.append(json.id, centralPulse);

    return centralPulse;
  }
}
