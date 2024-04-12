import { IGetAnswerUsecase } from '@domain/usecases';

import { GetAnswerUsecase } from '@data/usecases';

import { makeAnswerDAO, makeFetchAnswerPublisher } from '@main/factories';

export function makeGetAnswerUsecase(): IGetAnswerUsecase {
  const fetchAnswerPublisher = makeFetchAnswerPublisher();
  const answerDAO = makeAnswerDAO();

  return new GetAnswerUsecase({ answerDAO, fetchAnswerPublisher });
}
