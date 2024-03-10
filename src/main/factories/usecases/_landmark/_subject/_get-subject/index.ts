import { GetSubjectUsecase } from '@domain/usecases';

import { makeDAOGetSubjectUsecase } from './crud';

export function makeGetSubjectUsecase(): GetSubjectUsecase {
  return makeDAOGetSubjectUsecase();
}
