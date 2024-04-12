import { IChangeSubjectUsecase } from '@domain/usecases';

import { ChangeSubjectUsecase } from '@data/usecases';

import {
  makeChangeSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeChangeSubjectUsecase(): IChangeSubjectUsecase {
  const changeSubjectPublisher = makeChangeSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectDAO = makeSubjectDAO();

  return new ChangeSubjectUsecase({
    changeSubjectPublisher,
    getMyPlayer,
    getSubject,
    subjectDAO,
  });
}
