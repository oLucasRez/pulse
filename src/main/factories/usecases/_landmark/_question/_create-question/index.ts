import { ICreateQuestionUsecase } from '@domain/usecases';

import { CreateQuestionUsecase } from '@data/usecases';

import {
  makeCreateQuestionPublisher,
  makeGetMyPlayerUsecase,
  makeGetMySubjectUsecase,
  makeNextGameStateUsecase,
  makeQuestionDAO,
} from '@main/factories';

export function makeCreateQuestionUsecase(): ICreateQuestionUsecase {
  const createQuestionPublisher = makeCreateQuestionPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getMySubject = makeGetMySubjectUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const questionDAO = makeQuestionDAO();

  return new CreateQuestionUsecase({
    createQuestionPublisher,
    getMyPlayer,
    getMySubject,
    nextGameState,
    questionDAO,
  });
}
