import { CreateSubjectUsecase } from '@domain/usecases';

import { makeCRUDCreateSubjectUsecase } from './crud';

export function makeCreateSubjectUsecase(): CreateSubjectUsecase {
  return makeCRUDCreateSubjectUsecase();
}
