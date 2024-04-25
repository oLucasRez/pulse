import { IEditSubjectUsecase } from '@domain/usecases';

import { EditSubjectUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectDAO,
  makeSubjectHydrator,
} from '@main/factories';

export function makeEditSubjectUsecase(): IEditSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new EditSubjectUsecase({
    getMyPlayer,
    getSubject,
    subjectDAO,
    subjectHydrator,
  });
}
