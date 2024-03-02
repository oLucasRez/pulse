import { GetCurrentGameUsecase } from '@domain/usecases';

import { makeCRUDGetCurrentGameUsecase } from './crud';

export function makeGetCurrentGameUsecase(): GetCurrentGameUsecase {
  return makeCRUDGetCurrentGameUsecase();
}
