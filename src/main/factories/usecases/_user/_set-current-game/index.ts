import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeDAOSetCurrentGameUsecase } from './dao';

export function makeSetCurrentGameUsecase(): SetCurrentGameUsecase {
  return makeDAOSetCurrentGameUsecase();
}
