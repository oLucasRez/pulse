import { LandmarkModel } from '@domain/models';

import { LandmarkCollection } from '@domain/collections';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class LandmarkHydrator {
  public static hydrate(json: LandmarkModel.JSON): LandmarkModel {
    const landmark: LandmarkModel = Object.assign(ModelHydrator.hydrate(json), {
      position: json.position ? Vector.fromJSON(json.position) : null,
    });

    const collection = LandmarkCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], landmark);
    else collection[json.id] = landmark;

    return landmark;
  }
}

export * from './_central-fact';
