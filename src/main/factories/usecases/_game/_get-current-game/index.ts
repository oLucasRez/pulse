import { GetCurrentGameUsecase } from '@domain/usecases';

import { makeDatabaseGetCurrentGameUsecase } from './database';

export function makeGetCurrentGameUsecase(): GetCurrentGameUsecase {
  return makeDatabaseGetCurrentGameUsecase();
}
