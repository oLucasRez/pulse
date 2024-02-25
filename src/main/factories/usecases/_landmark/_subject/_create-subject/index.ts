import { CreateSubjectUsecase } from '@domain/usecases';

import { makeDatabaseCreateSubjectUsecase } from './database';

export function makeCreateSubjectUsecase(): CreateSubjectUsecase {
  return makeDatabaseCreateSubjectUsecase();
}
