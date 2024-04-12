import { ICreateSubjectPulseUsecase } from '@domain/usecases';

import { CreateSubjectPulseUsecase } from '@data/usecases';

import {
  makeCreateSubjectPulsePublisher,
  makeNextGameStateUsecase,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeCreateSubjectPulseUsecase(): ICreateSubjectPulseUsecase {
  const createSubjectPulsePublisher = makeCreateSubjectPulsePublisher();
  const nextGameState = makeNextGameStateUsecase();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new CreateSubjectPulseUsecase({
    createSubjectPulsePublisher,
    nextGameState,
    subjectPulseDAO,
  });
}
