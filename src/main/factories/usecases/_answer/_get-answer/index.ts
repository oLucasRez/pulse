import { IGetAnswerUsecase } from '@domain/usecases';

import { GetAnswerUsecase } from '@data/usecases';

import { makeAnswerDAO, makeAnswerHydrator } from '@main/factories';

export function makeGetAnswerUsecase(): IGetAnswerUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();

  return new GetAnswerUsecase({
    answerDAO,
    answerHydrator,
  });
}
