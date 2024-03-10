import { LandmarkModel, SubjectModel } from '@domain/models';

import { SubjectDAO } from '@data/dao';

import { LandmarkHydrator } from '..';

export class SubjectHydrator {
  public static hydrate(dto: SubjectDAO.DTO): SubjectModel {
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
