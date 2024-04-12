import { IWatchQuestionsUsecase } from '@domain/usecases';

import { WatchQuestionsUsecase } from '@data/usecases';

import { makeFetchQuestionsPublisher, makeQuestionDAO } from '@main/factories';

export function makeWatchQuestionsUsecase(): IWatchQuestionsUsecase {
  const fetchQuestionsPublisher = makeFetchQuestionsPublisher();
  const questionDAO = makeQuestionDAO();

  return new WatchQuestionsUsecase({
    fetchQuestionsPublisher,
    questionDAO,
  });
}
