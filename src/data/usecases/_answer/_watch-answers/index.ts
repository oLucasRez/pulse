import { IWatchAnswersUsecase } from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class WatchAnswersUsecase implements IWatchAnswersUsecase {
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({ answerDAO, answerHydrator }: Deps) {
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
  }

  public async execute(
    callback: IWatchAnswersUsecase.Callback,
  ): Promise<IWatchAnswersUsecase.Response> {
    return this.answerDAO.watch(async (dtos) => {
      const answers = await Promise.all(
        dtos.map((dto) => this.answerHydrator.hydrate(dto)),
      );

      callback(answers);
    });
  }
}

type Deps = {
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
