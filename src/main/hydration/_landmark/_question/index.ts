import { NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IAnswerDAO, IPlayerDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

import { getAnswerState } from '@main/hydration/helpers';

export class QuestionHydrator implements IQuestionHydrator {
  private readonly answerDAO: IAnswerDAO;
  private readonly playerDAO: IPlayerDAO;
  public constructor({ answerDAO, playerDAO }: Deps) {
    this.answerDAO = answerDAO;
    this.playerDAO = playerDAO;
  }

  public async hydrate(dto: QuestionModel.DTO): Promise<QuestionModel> {
    const author = await this.playerDAO.getByOrder(dto.order);

    if (!author)
      throw new NotFoundError({
        metadata: { entity: 'Player', prop: 'order', value: dto.order },
      });

    const answers = await this.answerDAO.getByQuestionID(dto.id);

    const solved = (
      await Promise.all(
        answers.map((answerDTO) =>
          getAnswerState(answerDTO, { playerDAO: this.playerDAO }),
        ),
      )
    ).some((state) => state === 'fact');

    return {
      id: dto.id,
      description: dto.description,
      position: Vector.fromJSON(dto.position),
      color: author.color,
      authorID: author.id,
      solved,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  answerDAO: IAnswerDAO;
  playerDAO: IPlayerDAO;
};
