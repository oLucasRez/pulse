import { CreateMySubjectUsecase } from '@domain/usecases';

import { makeDAOCreateMySubjectUsecase } from './crud';

export function makeCreateMySubjectUsecase(): CreateMySubjectUsecase {
  return makeDAOCreateMySubjectUsecase();
}
