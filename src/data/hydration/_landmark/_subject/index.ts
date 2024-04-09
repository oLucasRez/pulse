import { LandmarkModel, SubjectModel } from '@domain/models';

import { LandmarkHydrator } from '..';

export class SubjectHydrator {
  public static hydrate(dto: SubjectModel.DTO): SubjectModel {
    const subject: SubjectModel = Object.assign<
      LandmarkModel,
      Omit<SubjectModel, keyof LandmarkModel>
    >(LandmarkHydrator.hydrate(dto), {
      description: dto.description,
      color: dto.color,
      icon: dto.icon,
      authorID: dto.authorID,
      pathIDs: dto.pathIDs,
    });

    return subject;
  }
}
