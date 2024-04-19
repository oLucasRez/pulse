import { IGetSubjectsUsecase } from '@domain/usecases';

import { GetSubjectsUsecase } from '@data/usecases';

import { makeSubjectDAO, makeSubjectHydrator } from '@main/factories';

export function makeGetSubjectsUsecase(): IGetSubjectsUsecase {
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new GetSubjectsUsecase({
    subjectDAO,
    subjectHydrator,
  });
}
