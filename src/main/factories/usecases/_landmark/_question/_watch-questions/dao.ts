import { WatchQuestionsUsecase } from '@domain/usecases';

import { DAOWatchQuestionsUsecase } from '@data/usecases';

import { makeFetchQuestionsPublisher, makeQuestionDAO } from '@main/factories';

export function makeDAOWatchQuestionsUsecase(): WatchQuestionsUsecase {
  const fetchQuestionsPublisher = makeFetchQuestionsPublisher();
  const questionDAO = makeQuestionDAO();

  return new DAOWatchQuestionsUsecase({
    fetchQuestionsPublisher,
    questionDAO,
  });
}
