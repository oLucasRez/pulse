import { IGetSubjectUsecase } from '@domain/usecases';

import { GetSubjectUsecase } from '@data/usecases';

import { makeFetchSubjectPublisher, makeSubjectDAO } from '@main/factories';

export function makeGetSubjectsUsecase(): IGetSubjectUsecase {
  const fetchSubjectPublisher = makeFetchSubjectPublisher();
  const subjectDAO = makeSubjectDAO();

  return new GetSubjectUsecase({
    fetchSubjectPublisher,
    subjectDAO,
  });
}
