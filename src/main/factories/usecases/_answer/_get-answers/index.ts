import { IGetAnswersUsecase } from '@domain/usecases';

import { GetAnswersUsecase } from '@data/usecases';

import { makeAnswerDAO, makeAnswerHydrator } from '@main/factories';

export function makeGetAnswersUsecase(): IGetAnswersUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();

  return new GetAnswersUsecase({
    answerDAO,
    answerHydrator,
  });
}
