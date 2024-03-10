import { GetSubjectUsecase } from '@domain/usecases';

import { DAOGetSubjectUsecase } from '@data/usecases';

import { makeSubjectDAO } from '@main/factories';

export function makeDAOGetSubjectUsecase(): GetSubjectUsecase {
  const subjectDAO = makeSubjectDAO();

  return new DAOGetSubjectUsecase({
    subjectDAO,
  });
}
