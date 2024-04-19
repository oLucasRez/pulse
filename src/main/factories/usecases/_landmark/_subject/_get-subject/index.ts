import { IGetSubjectUsecase } from '@domain/usecases';

import { GetSubjectUsecase } from '@data/usecases';

import { makeSubjectDAO, makeSubjectHydrator } from '@main/factories';

export function makeGetSubjectUsecase(): IGetSubjectUsecase {
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new GetSubjectUsecase({
    subjectDAO,
    subjectHydrator,
  });
}
