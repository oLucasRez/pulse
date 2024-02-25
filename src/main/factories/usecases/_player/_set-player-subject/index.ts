import { SetPlayerSubjectUsecase } from '@domain/usecases';

import { makeDatabaseSetPlayerSubjectUsecase } from './database';

export function makeSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  return makeDatabaseSetPlayerSubjectUsecase();
}
