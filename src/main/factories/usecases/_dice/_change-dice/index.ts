import { ChangeDiceUsecase } from '@domain/usecases';

import { makeCRUDChangeDiceUsecase } from './crud';

export function makeChangeDiceUsecase(): ChangeDiceUsecase {
  return makeCRUDChangeDiceUsecase();
}
