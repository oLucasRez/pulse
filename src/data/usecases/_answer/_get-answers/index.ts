import { AnswerModel } from '@domain/models';
import { IGetAnswersUsecase } from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class GetAnswersUsecase implements IGetAnswersUsecase {
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({ answerDAO, answerHydrator }: Deps) {
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
  }

  public async execute(): Promise<AnswerModel[]> {
    const dtos = await this.answerDAO.getAll();

    const answers = await Promise.all(
      dtos.map((dto) => this.answerHydrator.hydrate(dto)),
    );

    return answers;
  }
}

type Deps = {
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
