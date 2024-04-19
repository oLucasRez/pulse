import { NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import { IGetAnswerUsecase, ISetQuestionFactUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class SetQuestionFactUsecase implements ISetQuestionFactUsecase {
  private readonly getAnswer: IGetAnswerUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({ getAnswer, questionDAO, questionHydrator }: Deps) {
    this.getAnswer = getAnswer;
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(answerID: string): Promise<QuestionModel> {
    const answer = await this.getAnswer.execute(answerID);
    if (!answer)
      throw new NotFoundError({
        metadata: { entity: 'Answer', prop: 'id', value: answerID },
      });

    const dto = await this.questionDAO.update(answer.questionID, {
      factID: answerID,
    });

    const question = await this.questionHydrator.hydrate(dto);

    return question;
  }
}

type Deps = {
  getAnswer: IGetAnswerUsecase;
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
