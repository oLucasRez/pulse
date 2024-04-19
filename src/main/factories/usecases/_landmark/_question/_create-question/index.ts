import { ICreateQuestionUsecase } from '@domain/usecases';

import { CreateQuestionUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeGetMySubjectUsecase,
  makeNextGameStateUsecase,
  makeQuestionDAO,
  makeQuestionHydrator,
} from '@main/factories';

export function makeCreateQuestionUsecase(): ICreateQuestionUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getMySubject = makeGetMySubjectUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new CreateQuestionUsecase({
    getMyPlayer,
    getMySubject,
    nextGameState,
    questionDAO,
    questionHydrator,
  });
}
