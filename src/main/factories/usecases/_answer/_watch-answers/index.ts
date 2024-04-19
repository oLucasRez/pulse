import { IWatchAnswersUsecase } from '@domain/usecases';

import { WatchAnswersUsecase } from '@data/usecases';

import { makeAnswerDAO, makeAnswerHydrator } from '@main/factories';

export function makeWatchAnswersUsecase(): IWatchAnswersUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();

  return new WatchAnswersUsecase({
    answerDAO,
    answerHydrator,
  });
}
