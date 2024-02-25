import { ChangeSubjectUsecase } from '@domain/usecases';

import { makeDatabaseChangeSubjectUsecase } from './database';

export function makeChangeSubjectUsecase(): ChangeSubjectUsecase {
  return makeDatabaseChangeSubjectUsecase();
}
