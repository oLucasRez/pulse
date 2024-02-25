import { GetMySubjectUsecase } from '@domain/usecases';

import { makeDatabaseGetMySubjectUsecase } from './database';

export function makeGetMySubjectUsecase(): GetMySubjectUsecase {
  return makeDatabaseGetMySubjectUsecase();
}
