import { GetSubjectUsecase } from '@domain/usecases';

import { makeDAOGetSubjectUsecase } from './dao';

export function makeGetSubjectUsecase(): GetSubjectUsecase {
  return makeDAOGetSubjectUsecase();
}
