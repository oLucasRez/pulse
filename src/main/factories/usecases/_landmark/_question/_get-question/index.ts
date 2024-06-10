import { IGetQuestionUsecase } from '@domain/usecases';

import { GetQuestionUsecase } from '@data/usecases';

import { makeQuestionDAO, makeQuestionHydrator } from '@main/factories';

export function makeGetQuestionUsecase(): IGetQuestionUsecase {
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new GetQuestionUsecase({
    questionDAO,
    questionHydrator,
  });
}
