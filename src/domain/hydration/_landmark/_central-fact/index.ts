import { CentralFactModel, LandmarkModel } from '@domain/models';

import { CentralFactCollection } from '@domain/collections';

import { Vector } from '@domain/utils';

import { LandmarkHydrator } from '..';

export class CentralFactHydrator {
  public static hydrate(json: CentralFactModel.JSON): CentralFactModel {
    const centralFact: CentralFactModel = Object.assign<
      LandmarkModel,
      Omit<CentralFactModel, keyof LandmarkModel> &
        Pick<CentralFactModel, 'position'>
    >(LandmarkHydrator.hydrate(json), {
      position: Vector.fromJSON(json.position),
      description: json.description,
    });

    const collection = CentralFactCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], centralFact);
    else collection[json.id] = centralFact;

    return centralFact;
  }
}
