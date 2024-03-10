import { ChangeSubjectUsecase } from '@domain/usecases';

import { DAOChangeSubjectUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeDAOChangeSubjectUsecase(): ChangeSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOChangeSubjectUsecase({
    getMyPlayer,
    getSubject,
    subjectDAO,
  });
}
