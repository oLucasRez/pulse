import { GetSubjectUsecase } from '@domain/usecases';

import { makeDatabaseGetSubjectUsecase } from './database';

export function makeGetSubjectUsecase(): GetSubjectUsecase {
  return makeDatabaseGetSubjectUsecase();
}
