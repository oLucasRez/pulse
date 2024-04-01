import { ChangeMySubjectUsecase } from '@domain/usecases';

import { DAOChangeMySubjectUsecase } from '@data/usecases';

import {
  makeChangeSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeDAOChangeMySubjectUsecase(): ChangeMySubjectUsecase {
  const changeSubjectPublisher = makeChangeSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOChangeMySubjectUsecase({
    changeSubjectPublisher,
    getMyPlayer,
    getSubject,
    subjectDAO,
  });
}
