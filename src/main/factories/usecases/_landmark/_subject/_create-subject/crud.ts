import { CreateSubjectUsecase } from '@domain/usecases';

import { DAOCreateSubjectUsecase } from '@data/usecases';

import { makeGetMyPlayerUsecase, makeSubjectDAO } from '@main/factories';

export function makeDAOCreateSubjectUsecase(): CreateSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOCreateSubjectUsecase({
    getMyPlayer,
    subjectDAO,
  });
}
