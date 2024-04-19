import { ISetQuestionFactUsecase } from '@domain/usecases';

import { SetQuestionFactUsecase } from '@data/usecases';

import {
  makeGetAnswerUsecase,
  makeQuestionDAO,
  makeQuestionHydrator,
} from '@main/factories';

export function makeSetQuestionFactUsecase(): ISetQuestionFactUsecase {
  const getAnswer = makeGetAnswerUsecase();
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new SetQuestionFactUsecase({
    getAnswer,
    questionDAO,
    questionHydrator,
  });
}
