import { GetMySubjectUsecase } from '@domain/usecases';

import { makeDAOGetMySubjectUsecase } from './crud';

export function makeGetMySubjectUsecase(): GetMySubjectUsecase {
  return makeDAOGetMySubjectUsecase();
}
