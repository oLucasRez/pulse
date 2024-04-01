import { GetSubjectPulsesUsecase } from '@domain/usecases';

import { DAOGetSubjectPulsesUsecase } from '@data/usecases';

import {
  makeFetchSubjectPulsesPublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeDAOGetSubjectPulsesUsecase(): GetSubjectPulsesUsecase {
  const fetchSubjectPulsesPublisher = makeFetchSubjectPulsesPublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new DAOGetSubjectPulsesUsecase({
    fetchSubjectPulsesPublisher,
    subjectPulseDAO,
  });
}
