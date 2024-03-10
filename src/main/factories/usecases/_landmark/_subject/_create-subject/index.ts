import { CreateSubjectUsecase } from '@domain/usecases';

import { makeDAOCreateSubjectUsecase } from './crud';

export function makeCreateSubjectUsecase(): CreateSubjectUsecase {
  return makeDAOCreateSubjectUsecase();
}
