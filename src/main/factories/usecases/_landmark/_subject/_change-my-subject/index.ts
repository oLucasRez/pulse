import { ChangeMySubjectUsecase } from '@domain/usecases';

import { makeDAOChangeMySubjectUsecase } from './dao';

export function makeChangeMySubjectUsecase(): ChangeMySubjectUsecase {
  return makeDAOChangeMySubjectUsecase();
}
