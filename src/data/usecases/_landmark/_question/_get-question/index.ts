import { QuestionModel } from '@domain/models';
import { IGetQuestionUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class GetQuestionUsecase implements IGetQuestionUsecase {
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({ questionHydrator, questionDAO }: Deps) {
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(id: string): Promise<QuestionModel | null> {
    const dto = await this.questionDAO.getByID(id);

    const question = dto ? await this.questionHydrator.hydrate(dto) : null;

    return question;
  }
}

type Deps = {
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
