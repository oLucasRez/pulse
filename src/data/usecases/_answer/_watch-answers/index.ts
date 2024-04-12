import { IWatchAnswersUsecase } from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { AnswerHydrator } from '@data/hydration';
import { FetchAnswersObserver } from '@data/observers';

export class WatchAnswersUsecase implements IWatchAnswersUsecase {
  private readonly answerDAO: IAnswerDAO;
  private readonly fetchAnswersPublisher: FetchAnswersObserver.Publisher;

  public constructor(deps: WatchAnswersUsecase.Deps) {
    this.answerDAO = deps.answerDAO;
    this.fetchAnswersPublisher = deps.fetchAnswersPublisher;
  }

  public async execute(
    callback: IWatchAnswersUsecase.Callback,
  ): Promise<IWatchAnswersUsecase.Response> {
    const unsubscribe = this.answerDAO.watch((dtos) => {
      const answers = dtos.map(AnswerHydrator.hydrate);

      this.fetchAnswersPublisher.notifyFetchAnswers(answers);

      callback(answers);
    });

    return unsubscribe;
  }
}

export namespace WatchAnswersUsecase {
  export type Deps = {
    answerDAO: IAnswerDAO;
    fetchAnswersPublisher: FetchAnswersObserver.Publisher;
  };
}
