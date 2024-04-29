import { NotFoundError } from '@domain/errors';
import { AnswerModel } from '@domain/models';

import { IPlayerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class AnswerHydrator implements IAnswerHydrator {
  private readonly playerDAO: IPlayerDAO;
  public constructor({ playerDAO }: Deps) {
    this.playerDAO = playerDAO;
  }

  public async hydrate(dto: AnswerModel.DTO): Promise<AnswerModel> {
    const author = await this.playerDAO.getByID(dto.authorID);

    if (!author)
      throw new NotFoundError({
        metadata: { entity: 'Player', prop: 'id', value: dto.authorID },
      });

    return {
      id: dto.id,
      description: dto.description,
      color: author.color,
      questionID: dto.questionID,
      authorID: dto.authorID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
};
