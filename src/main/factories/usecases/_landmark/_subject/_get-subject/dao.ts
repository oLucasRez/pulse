import { GetSubjectUsecase } from '@domain/usecases';

import { DAOGetSubjectUsecase } from '@data/usecases';

import { makeFetchSubjectPublisher, makeSubjectDAO } from '@main/factories';

export function makeDAOGetSubjectUsecase(): GetSubjectUsecase {
  const fetchSubjectPublisher = makeFetchSubjectPublisher();
  const subjectDAO = makeSubjectDAO();

  return new DAOGetSubjectUsecase({
    fetchSubjectPublisher,
    subjectDAO,
  });
}
