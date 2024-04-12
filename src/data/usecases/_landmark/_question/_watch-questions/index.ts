import { IWatchQuestionsUsecase } from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { QuestionHydrator } from '@data/hydration';
import { FetchQuestionsObserver } from '@data/observers';

export class WatchQuestionsUsecase implements IWatchQuestionsUsecase {
  private readonly questionDAO: IQuestionDAO;
  private readonly fetchQuestionsPublisher: FetchQuestionsObserver.Publisher;

  public constructor({ questionDAO, fetchQuestionsPublisher }: Deps) {
    this.questionDAO = questionDAO;
    this.fetchQuestionsPublisher = fetchQuestionsPublisher;
  }

  public async execute(
    callback: IWatchQuestionsUsecase.Callback,
  ): Promise<IWatchQuestionsUsecase.Response> {
    const unsubscribe = this.questionDAO.watch((dtos) => {
      const questions = dtos.map(QuestionHydrator.hydrate);

      this.fetchQuestionsPublisher.notifyFetchQuestions(questions);

      callback(questions);
    });

    return unsubscribe;
  }
}

type Deps = {
  questionDAO: IQuestionDAO;
  fetchQuestionsPublisher: FetchQuestionsObserver.Publisher;
};
