import { NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import { IGetAnswerUsecase, ISetQuestionFactUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { QuestionHydrator } from '@data/hydration';
import { ChangeQuestionObserver } from '@data/observers';

export class SetQuestionFactUsecase implements ISetQuestionFactUsecase {
  private readonly getAnswer: IGetAnswerUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly changeQuestionPublisher: ChangeQuestionObserver.Publisher;

  public constructor({
    getAnswer,
    changeQuestionPublisher,
    questionDAO,
  }: Deps) {
    this.getAnswer = getAnswer;
    this.questionDAO = questionDAO;
    this.changeQuestionPublisher = changeQuestionPublisher;
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

    const question = QuestionHydrator.hydrate(dto);

    this.changeQuestionPublisher.notifyChangeQuestion(question);

    return question;
  }
}

type Deps = {
  getAnswer: IGetAnswerUsecase;
  questionDAO: IQuestionDAO;
  changeQuestionPublisher: ChangeQuestionObserver.Publisher;
};
