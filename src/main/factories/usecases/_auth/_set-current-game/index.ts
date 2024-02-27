import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeDatabaseSetCurrentGameUsecase } from './database';

export function makeSetCurrentGameUsecase(): SetCurrentGameUsecase {
  return makeDatabaseSetCurrentGameUsecase();
}
