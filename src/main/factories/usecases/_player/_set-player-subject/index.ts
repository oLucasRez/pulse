import { SetPlayerSubjectUsecase } from '@domain/usecases';

import { makeDAOSetPlayerSubjectUsecase } from './dao';

export function makeSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  return makeDAOSetPlayerSubjectUsecase();
}
