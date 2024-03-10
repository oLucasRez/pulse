import { GetSubjectUsecase } from '@domain/usecases';

import { makeDAOGetSubjectsUsecase } from './crud';

export function makeGetSubjectsUsecase(): GetSubjectUsecase {
  return makeDAOGetSubjectsUsecase();
}
