import { LandmarkModel, Model } from '@domain/models';

import { LandmarkCollection } from '@data/collections';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class LandmarkHydrator {
  public static hydrate(json: LandmarkModel.JSON): LandmarkModel {
    const landmark: LandmarkModel = Object.assign<
      Model,
      Omit<LandmarkModel, keyof Model>
    >(ModelHydrator.hydrate(json), {
      position: json.position ? Vector.fromJSON(json.position) : null,
    });

    LandmarkCollection.append(json.id, landmark);

    return landmark;
  }
}

export * from './_central-fact';
export * from './_subject';
