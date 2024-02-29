import { SetPlayerSubjectUsecase } from '@domain/usecases';

import { makeCRUDSetPlayerSubjectUsecase } from './crud';

export function makeSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  return makeCRUDSetPlayerSubjectUsecase();
}
