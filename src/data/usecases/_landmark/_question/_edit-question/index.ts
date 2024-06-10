import { ForbiddenError, NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import {
  IEditQuestionUsecase,
  IGetMyPlayerUsecase,
  IGetQuestionUsecase,
} from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class EditQuestionUsecase implements IEditQuestionUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getQuestion: IGetQuestionUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({
    getMyPlayer,
    getQuestion,
    questionDAO,
    questionHydrator,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.getQuestion = getQuestion;
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(
    id: string,
    payload: IEditQuestionUsecase.Payload,
  ): Promise<QuestionModel> {
    const { description } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const question = await this.getQuestion.execute(id);

    if (!question)
      throw new NotFoundError({
        metadata: { entity: 'Question', prop: 'id', value: id },
      });

    if (question.authorID !== myPlayer.id)
      throw new ForbiddenError({
        metadata: { tried: 'change question that is not mine' },
      });

    const dto = await this.questionDAO.update(id, {
      description,
    });

    return this.questionHydrator.hydrate(dto);
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  getQuestion: IGetQuestionUsecase;
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
