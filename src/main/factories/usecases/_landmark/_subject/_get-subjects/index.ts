import { GetSubjectUsecase } from '@domain/usecases';

import { makeDAOGetSubjectsUsecase } from './dao';

export function makeGetSubjectsUsecase(): GetSubjectUsecase {
  return makeDAOGetSubjectsUsecase();
}
