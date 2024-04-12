import { ISetQuestionFactUsecase } from '@domain/usecases';

import { SetQuestionFactUsecase } from '@data/usecases';

import {
  makeChangeQuestionPublisher,
  makeGetAnswerUsecase,
  makeQuestionDAO,
} from '@main/factories';

export function makeSetQuestionFactUsecase(): ISetQuestionFactUsecase {
  const changeQuestionPublisher = makeChangeQuestionPublisher();
  const getAnswer = makeGetAnswerUsecase();
  const questionDAO = makeQuestionDAO();

  return new SetQuestionFactUsecase({
    changeQuestionPublisher,
    getAnswer,
    questionDAO,
  });
}
