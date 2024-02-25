import { CreateMySubjectUsecase } from '@domain/usecases';

import { makeDatabaseCreateMySubjectUsecase } from './database';

export function makeCreateMySubjectUsecase(): CreateMySubjectUsecase {
  return makeDatabaseCreateMySubjectUsecase();
}
