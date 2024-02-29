import { CreateMySubjectUsecase } from '@domain/usecases';

import { makeCRUDCreateMySubjectUsecase } from './crud';

export function makeCreateMySubjectUsecase(): CreateMySubjectUsecase {
  return makeCRUDCreateMySubjectUsecase();
}
