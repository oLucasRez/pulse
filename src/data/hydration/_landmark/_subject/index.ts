import { LandmarkModel, SubjectModel } from '@domain/models';

import {
  PlayerCollection,
  SubjectCollection,
  SubjectPulseCollection,
} from '@data/collections';

import { SubjectCRUD } from '@data/cruds';

import { LandmarkHydrator } from '..';

export class SubjectHydrator {
  public static async hydrate(dto: SubjectCRUD.DTO): Promise<SubjectModel> {
    const subject: SubjectModel = Object.assign<
      LandmarkModel,
      Omit<SubjectModel, keyof LandmarkModel>
    >(await LandmarkHydrator.hydrate(dto), {
      description: dto.description,
      color: dto.color,
      author: await PlayerCollection.get(dto.authorID),
      path: dto.pathIDs.map(SubjectPulseCollection.get),
    });

    SubjectCollection.append(dto.id, subject);

    return subject;
  }
}
