import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeCRUDSetCurrentGameUsecase } from './crud';

export function makeSetCurrentGameUsecase(): SetCurrentGameUsecase {
  return makeCRUDSetCurrentGameUsecase();
}
