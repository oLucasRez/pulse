import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { ISubjectHydrator } from '@data/hydration';

export class SubjectHydrator implements ISubjectHydrator {
  public async hydrate(dto: SubjectModel.DTO): Promise<SubjectModel> {
    return {
      id: dto.id,
      description: dto.description,
      position: dto.position && Vector.fromJSON(dto.position),
      color: dto.color,
      icon: dto.icon,
      authorID: dto.authorID,
      pathIDs: dto.pathIDs,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
