import { ChangeSubjectUsecase } from '@domain/usecases';

import { makeDAOChangeSubjectUsecase } from './dao';

export function makeChangeSubjectUsecase(): ChangeSubjectUsecase {
  return makeDAOChangeSubjectUsecase();
}
