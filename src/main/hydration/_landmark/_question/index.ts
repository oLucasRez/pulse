import { NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IPlayerDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class QuestionHydrator implements IQuestionHydrator {
  private readonly playerDAO: IPlayerDAO;
  public constructor({ playerDAO }: Deps) {
    this.playerDAO = playerDAO;
  }

  public async hydrate(dto: QuestionModel.DTO): Promise<QuestionModel> {
    const author = await this.playerDAO.getByOrder(dto.order);

    if (!author)
      throw new NotFoundError({
        metadata: { entity: 'Player', prop: 'order', value: dto.order },
      });

    const players = await this.playerDAO.getUnbanned();

    const factID = players.reduce((factID, { id }) => {
      if (!(id in dto.votes)) return null;
      if (!factID) return null;

      if (factID === dto.votes[id]?.answerID && dto.votes[id]?.upToDate)
        return factID;

      return null;
    }, Object.values(dto.votes)[0]?.answerID as string | null);

    return {
      id: dto.id,
      description: dto.description,
      position: Vector.fromJSON(dto.position),
      color: author.color,
      votes: dto.votes,
      factID,
      authorID: author.id,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
};
