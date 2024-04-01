import { GetSubjectPulseUsecase } from '@domain/usecases';

import { DAOGetSubjectPulseUsecase } from '@data/usecases';

import {
  makeFetchSubjectPulsePublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeDAOGetSubjectPulseUsecase(): GetSubjectPulseUsecase {
  const fetchSubjectPulsePublisher = makeFetchSubjectPulsePublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new DAOGetSubjectPulseUsecase({
    fetchSubjectPulsePublisher,
    subjectPulseDAO,
  });
}
