import { FailedError } from '@domain/errors';
import { WatchQuestionsUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { QuestionHydrator } from '@data/hydration';
import { FetchQuestionsObserver } from '@data/observers';

export class DAOWatchQuestionsUsecase implements WatchQuestionsUsecase {
  private readonly questionDAO: IQuestionDAO;
  private readonly fetchQuestionsPublisher: FetchQuestionsObserver.Publisher;

  public constructor(deps: DAOWatchQuestionsUsecase.Deps) {
    this.questionDAO = deps.questionDAO;
    this.fetchQuestionsPublisher = deps.fetchQuestionsPublisher;
  }

  public async execute(
    callback: WatchQuestionsUsecase.Callback,
  ): Promise<WatchQuestionsUsecase.Response> {
    try {
      const unsubscribe = this.questionDAO.watch((dtos) => {
        const questions = dtos.map(QuestionHydrator.hydrate);

        this.fetchQuestionsPublisher.notifyFetchQuestions(questions);

        callback(questions);
      });

      return unsubscribe;
    } catch {
      throw new FailedError({
        metadata: { tried: 'listen questions changes' },
      });
    }
  }
}

export namespace DAOWatchQuestionsUsecase {
  export type Deps = {
    questionDAO: IQuestionDAO;
    fetchQuestionsPublisher: FetchQuestionsObserver.Publisher;
  };
}
