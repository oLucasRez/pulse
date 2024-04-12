import { CreateSubjectPulseUsecase } from '@domain/usecases';

import { DAOCreateSubjectPulseUsecase } from '@data/usecases';

import {
  makeCreateSubjectPulsePublisher,
  makeNextGameStateUsecase,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeDAOCreateSubjectPulseUsecase(): CreateSubjectPulseUsecase {
  const createSubjectPulsePublisher = makeCreateSubjectPulsePublisher();
  const nextGameState = makeNextGameStateUsecase();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new DAOCreateSubjectPulseUsecase({
    createSubjectPulsePublisher,
    nextGameState,
    subjectPulseDAO,
  });
}
