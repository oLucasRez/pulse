import { SetPlayerSubjectUsecase } from '@domain/usecases';

import { makeDAOSetPlayerSubjectUsecase } from './crud';

export function makeSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  return makeDAOSetPlayerSubjectUsecase();
}
