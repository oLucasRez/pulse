import { LandmarkModel, SubjectModel } from '@domain/models';

import {
  PlayerCollection,
  SubjectCollection,
  SubjectPulseCollection,
} from '@domain/collections';

import { LandmarkHydrator } from '..';

export class SubjectHydrator {
  public static hydrate(json: SubjectModel.JSON): SubjectModel {
    const centralFact: SubjectModel = Object.assign<
      LandmarkModel,
      Omit<SubjectModel, keyof LandmarkModel>
    >(LandmarkHydrator.hydrate(json), {
      description: json.description,
      color: json.color,
      author: PlayerCollection.get(json.authorID),
      path: json.pathIDs.map(SubjectPulseCollection.get),
    });

    const collection = SubjectCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], centralFact);
    else collection[json.id] = centralFact;

    return centralFact;
  }
}
