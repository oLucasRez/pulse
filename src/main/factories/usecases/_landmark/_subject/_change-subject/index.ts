import { IChangeSubjectUsecase } from '@domain/usecases';

import { ChangeSubjectUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectDAO,
  makeSubjectHydrator,
} from '@main/factories';

export function makeChangeSubjectUsecase(): IChangeSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new ChangeSubjectUsecase({
    getMyPlayer,
    getSubject,
    subjectDAO,
    subjectHydrator,
  });
}
