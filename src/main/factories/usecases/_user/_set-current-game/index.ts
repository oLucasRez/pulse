import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeDAOSetCurrentGameUsecase } from './crud';

export function makeSetCurrentGameUsecase(): SetCurrentGameUsecase {
  return makeDAOSetCurrentGameUsecase();
}
