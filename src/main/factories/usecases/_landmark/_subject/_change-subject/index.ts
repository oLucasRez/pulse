import { ChangeSubjectUsecase } from '@domain/usecases';

import { makeCRUDChangeSubjectUsecase } from './crud';

export function makeChangeSubjectUsecase(): ChangeSubjectUsecase {
  return makeCRUDChangeSubjectUsecase();
}
