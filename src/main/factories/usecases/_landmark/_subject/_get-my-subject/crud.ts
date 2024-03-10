import { GetMySubjectUsecase } from '@domain/usecases';

import { DAOGetMySubjectUsecase } from '@data/usecases';

import { makeGetMyPlayerUsecase, makeSubjectDAO } from '@main/factories';

export function makeDAOGetMySubjectUsecase(): GetMySubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOGetMySubjectUsecase({
    getMyPlayer,
    subjectDAO,
  });
}
