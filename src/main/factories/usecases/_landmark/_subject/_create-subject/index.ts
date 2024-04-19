import { ICreateSubjectUsecase } from '@domain/usecases';

import { CreateSubjectUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeSubjectDAO,
  makeSubjectHydrator,
} from '@main/factories';

export function makeCreateSubjectUsecase(): ICreateSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new CreateSubjectUsecase({
    getMyPlayer,
    subjectDAO,
    subjectHydrator,
  });
}
