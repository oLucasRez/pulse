import { CreateMySubjectUsecase } from '@domain/usecases';

import { makeDAOCreateMySubjectUsecase } from './dao';

export function makeCreateMySubjectUsecase(): CreateMySubjectUsecase {
  return makeDAOCreateMySubjectUsecase();
}
