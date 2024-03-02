import { LandmarkModel, SubjectModel } from '@domain/models';

import { SubjectCRUD } from '@data/cruds';

import { LandmarkHydrator } from '..';

export class SubjectHydrator {
  public static hydrate(dto: SubjectCRUD.DTO): SubjectModel {
    const subject: SubjectModel = Object.assign<
      LandmarkModel,
      Omit<SubjectModel, keyof LandmarkModel>
    >(LandmarkHydrator.hydrate(dto), {
      description: dto.description,
      color: dto.color,
      authorID: dto.authorID,
      pathIDs: dto.pathIDs,
    });

    return subject;
  }
}
