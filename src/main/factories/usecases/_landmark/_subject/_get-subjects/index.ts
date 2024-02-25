import { GetSubjectUsecase } from '@domain/usecases';

import { makeDatabaseGetSubjectsUsecase } from './database';

export function makeGetSubjectsUsecase(): GetSubjectUsecase {
  return makeDatabaseGetSubjectsUsecase();
}
