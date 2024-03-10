import { ChangeSubjectUsecase } from '@domain/usecases';

import { makeDAOChangeSubjectUsecase } from './crud';

export function makeChangeSubjectUsecase(): ChangeSubjectUsecase {
  return makeDAOChangeSubjectUsecase();
}
