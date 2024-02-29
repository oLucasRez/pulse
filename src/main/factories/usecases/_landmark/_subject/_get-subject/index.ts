import { GetSubjectUsecase } from '@domain/usecases';

import { makeCRUDGetSubjectUsecase } from './crud';

export function makeGetSubjectUsecase(): GetSubjectUsecase {
  return makeCRUDGetSubjectUsecase();
}
