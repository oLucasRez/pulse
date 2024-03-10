import { GetCurrentGameUsecase } from '@domain/usecases';

import { makeDAOGetCurrentGameUsecase } from './crud';

export function makeGetCurrentGameUsecase(): GetCurrentGameUsecase {
  return makeDAOGetCurrentGameUsecase();
}
