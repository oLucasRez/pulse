import { DeleteGameUsecase } from '@domain/usecases';

import { makeDatabaseDeleteGameUsecase } from './database';

export function makeDeleteGameUsecase(): DeleteGameUsecase {
  return makeDatabaseDeleteGameUsecase();
}
