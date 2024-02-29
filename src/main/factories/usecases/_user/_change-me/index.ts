import { ChangeMeUsecase } from '@domain/usecases';

import { makeCRUDChangeMeUsecase } from './crud';

export function makeChangeMeUsecase(): ChangeMeUsecase {
  return makeCRUDChangeMeUsecase();
}
