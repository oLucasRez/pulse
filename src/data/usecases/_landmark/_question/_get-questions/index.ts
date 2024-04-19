import { QuestionModel } from '@domain/models';
import { IGetQuestionsUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class GetQuestionsUsecase implements IGetQuestionsUsecase {
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({ questionDAO, questionHydrator }: Deps) {
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(): Promise<QuestionModel[]> {
    const dtos = await this.questionDAO.getAll();

    const questions = await Promise.all(
      dtos.map((dto) => this.questionHydrator.hydrate(dto)),
    );

    return questions;
  }
}

type Deps = {
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
