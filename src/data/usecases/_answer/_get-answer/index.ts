import { AnswerModel } from '@domain/models';
import { IGetAnswerUsecase } from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class GetAnswerUsecase implements IGetAnswerUsecase {
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({ answerHydrator, answerDAO }: Deps) {
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
  }

  public async execute(id: string): Promise<AnswerModel | null> {
    const dto = await this.answerDAO.getByID(id);

    const answer = dto ? await this.answerHydrator.hydrate(dto) : null;

    return answer;
  }
}

type Deps = {
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
