import { IGetMySubjectUsecase } from '@domain/usecases';

import { GetMySubjectUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeSubjectDAO,
  makeSubjectHydrator,
} from '@main/factories';

export function makeGetMySubjectUsecase(): IGetMySubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new GetMySubjectUsecase({
    getMyPlayer,
    subjectDAO,
    subjectHydrator,
  });
}
