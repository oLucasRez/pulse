import { ChangeSubjectUsecase } from '@domain/usecases';

import { DAOChangeSubjectUsecase } from '@data/usecases';

import {
  makeChangeSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeDAOChangeSubjectUsecase(): ChangeSubjectUsecase {
  const changeSubjectPublisher = makeChangeSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOChangeSubjectUsecase({
    changeSubjectPublisher,
    getMyPlayer,
    getSubject,
    subjectDAO,
  });
}
