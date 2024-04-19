import { IWatchQuestionsUsecase } from '@domain/usecases';

import { WatchQuestionsUsecase } from '@data/usecases';

import { makeQuestionDAO, makeQuestionHydrator } from '@main/factories';

export function makeWatchQuestionsUsecase(): IWatchQuestionsUsecase {
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new WatchQuestionsUsecase({
    questionDAO,
    questionHydrator,
  });
}
