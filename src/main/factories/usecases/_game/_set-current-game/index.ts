import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeCacheSetCurrentGameUsecase } from './cache';

export function makeSetCurrentGameUsecase(): SetCurrentGameUsecase {
  return makeCacheSetCurrentGameUsecase();
}
