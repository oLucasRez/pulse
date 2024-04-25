import { IWatchQuestionsUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class WatchQuestionsUsecase implements IWatchQuestionsUsecase {
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({ questionDAO, questionHydrator }: Deps) {
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(
    callback: IWatchQuestionsUsecase.Callback,
  ): Promise<() => void> {
    return this.questionDAO.watch(async (dtos) => {
      const questions = await Promise.all(
        dtos.map((dto) => this.questionHydrator.hydrate(dto)),
      );

      callback(questions);
    });
  }
}

type Deps = {
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
