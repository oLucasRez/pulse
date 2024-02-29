import { LandmarkModel, SubjectModel } from '@domain/models';

import {
  PlayerCollection,
  SubjectCollection,
  SubjectPulseCollection,
} from '@data/collections';

import { LandmarkHydrator } from '..';

export class SubjectHydrator {
  public static async hydrate(json: SubjectModel.JSON): Promise<SubjectModel> {
    const subject: SubjectModel = Object.assign<
      LandmarkModel,
      Omit<SubjectModel, keyof LandmarkModel>
    >(await LandmarkHydrator.hydrate(json), {
      description: json.description,
      color: json.color,
      author: await PlayerCollection.get(json.authorID),
      path: json.pathIDs.map(SubjectPulseCollection.get),
    });

    SubjectCollection.append(json.id, subject);

    return subject;
  }
}
