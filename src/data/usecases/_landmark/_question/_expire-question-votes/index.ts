import { NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import { IExpireQuestionVotesUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class ExpireQuestionVotesUsecase implements IExpireQuestionVotesUsecase {
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({ questionDAO, questionHydrator }: Deps) {
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(id: string): Promise<QuestionModel> {
    let dto = await this.questionDAO.getByID(id);

    if (!dto)
      throw new NotFoundError({
        metadata: { entity: 'Question', prop: 'id', value: id },
      });

    const votes = Object.entries(dto.votes).reduce((votes, [key, value]) => {
      votes[key] = { answerID: value.answerID, upToDate: false };

      return votes;
    }, dto.votes);

    dto = await this.questionDAO.update(dto.id, { votes });

    return this.questionHydrator.hydrate(dto);
  }
}

type Deps = {
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
