import { ForbiddenError, NotFoundError } from '@domain/errors';
import { AnswerModel } from '@domain/models';
import {
  IEditAnswerUsecase,
  IGetAnswerUsecase,
  IGetMyPlayerUsecase,
} from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class EditAnswerUsecase implements IEditAnswerUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getAnswer: IGetAnswerUsecase;
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({
    getMyPlayer,
    getAnswer,
    answerDAO,
    answerHydrator,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.getAnswer = getAnswer;
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
  }

  public async execute(
    id: string,
    payload: IEditAnswerUsecase.Payload,
  ): Promise<AnswerModel> {
    const { description } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const answer = await this.getAnswer.execute(id);

    if (!answer)
      throw new NotFoundError({
        metadata: { entity: 'Answer', prop: 'id', value: id },
      });

    if (answer.authorID !== myPlayer.id)
      throw new ForbiddenError({
        metadata: { tried: 'change answer that is not mine' },
      });

    const dto = await this.answerDAO.update(id, {
      description,
    });

    return this.answerHydrator.hydrate(dto);
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  getAnswer: IGetAnswerUsecase;
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
