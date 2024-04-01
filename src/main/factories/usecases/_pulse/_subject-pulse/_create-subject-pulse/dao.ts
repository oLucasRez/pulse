import { CreateSubjectPulseUsecase } from '@domain/usecases';

import { DAOCreateSubjectPulseUsecase } from '@data/usecases';

import {
  makeCreateSubjectPulsePublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeDAOCreateSubjectPulseUsecase(): CreateSubjectPulseUsecase {
  const createSubjectPulsePublisher = makeCreateSubjectPulsePublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new DAOCreateSubjectPulseUsecase({
    createSubjectPulsePublisher,
    subjectPulseDAO,
  });
}
