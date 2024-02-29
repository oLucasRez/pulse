import { GetSubjectUsecase } from '@domain/usecases';

import { makeCRUDGetSubjectsUsecase } from './crud';

export function makeGetSubjectsUsecase(): GetSubjectUsecase {
  return makeCRUDGetSubjectsUsecase();
}
