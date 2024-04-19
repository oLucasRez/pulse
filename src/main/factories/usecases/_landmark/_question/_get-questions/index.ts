import { IGetQuestionsUsecase } from '@domain/usecases';

import { GetQuestionsUsecase } from '@data/usecases';

import { makeQuestionDAO, makeQuestionHydrator } from '@main/factories';

export function makeGetQuestionsUsecase(): IGetQuestionsUsecase {
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new GetQuestionsUsecase({
    questionDAO,
    questionHydrator,
  });
}
