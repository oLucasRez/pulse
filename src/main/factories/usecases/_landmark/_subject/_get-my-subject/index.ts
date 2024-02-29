import { GetMySubjectUsecase } from '@domain/usecases';

import { makeCRUDGetMySubjectUsecase } from './crud';

export function makeGetMySubjectUsecase(): GetMySubjectUsecase {
  return makeCRUDGetMySubjectUsecase();
}
