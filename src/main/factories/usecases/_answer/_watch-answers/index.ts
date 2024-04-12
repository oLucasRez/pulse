import { IWatchAnswersUsecase } from '@domain/usecases';

import { WatchAnswersUsecase } from '@data/usecases';

import { makeAnswerDAO, makeFetchAnswersPublisher } from '@main/factories';

export function makeWatchAnswersUsecase(): IWatchAnswersUsecase {
  const answerDAO = makeAnswerDAO();
  const fetchAnswersPublisher = makeFetchAnswersPublisher();

  return new WatchAnswersUsecase({ answerDAO, fetchAnswersPublisher });
}
