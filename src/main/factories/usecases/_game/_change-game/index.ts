import { ChangeGameUsecase } from '@domain/usecases';

import { makeDatabaseChangeGameUsecase } from './database';

export function makeChangeGameUsecase(): ChangeGameUsecase {
  return makeDatabaseChangeGameUsecase();
}
