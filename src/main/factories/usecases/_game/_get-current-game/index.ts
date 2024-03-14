import { GetCurrentGameUsecase } from '@domain/usecases';

import { makeDAOGetCurrentGameUsecase } from './dao';

export function makeGetCurrentGameUsecase(): GetCurrentGameUsecase {
  return makeDAOGetCurrentGameUsecase();
}
