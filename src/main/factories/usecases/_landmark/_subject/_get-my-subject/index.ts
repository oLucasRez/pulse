import { GetMySubjectUsecase } from '@domain/usecases';

import { makeDAOGetMySubjectUsecase } from './dao';

export function makeGetMySubjectUsecase(): GetMySubjectUsecase {
  return makeDAOGetMySubjectUsecase();
}
