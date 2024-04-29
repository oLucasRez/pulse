import { IExpireQuestionVotesUsecase } from '@domain/usecases';

import { ExpireQuestionVotesUsecase } from '@data/usecases';

import { makeQuestionDAO, makeQuestionHydrator } from '@main/factories';

export function makeExpireQuestionVotesUsecase(): IExpireQuestionVotesUsecase {
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new ExpireQuestionVotesUsecase({
    questionDAO,
    questionHydrator,
  });
}
