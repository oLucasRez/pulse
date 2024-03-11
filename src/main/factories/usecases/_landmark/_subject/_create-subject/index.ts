import { CreateSubjectUsecase } from '@domain/usecases';

import { makeDAOCreateSubjectUsecase } from './dao';

export function makeCreateSubjectUsecase(): CreateSubjectUsecase {
  return makeDAOCreateSubjectUsecase();
}
