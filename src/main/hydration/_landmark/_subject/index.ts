import { NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IPlayerDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class SubjectHydrator implements ISubjectHydrator {
  private readonly playerDAO: IPlayerDAO;
  public constructor({ playerDAO }: Deps) {
    this.playerDAO = playerDAO;
  }

  public async hydrate(dto: SubjectModel.DTO): Promise<SubjectModel> {
    const author = await this.playerDAO.getByID(dto.authorID);

    if (!author)
      throw new NotFoundError({
        metadata: { entity: 'Author', prop: 'id', value: dto.authorID },
      });

    return {
      id: dto.id,
      description: dto.description,
      position: dto.position && Vector.fromJSON(dto.position),
      color: dto.color ?? author?.color,
      icon: dto.icon,
      authorID: dto.authorID,
      pathIDs: dto.pathIDs,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
};
