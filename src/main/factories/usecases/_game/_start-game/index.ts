import { StartGameUsecase } from '@domain/usecases';

import { makeDatabaseStartGameUsecase } from './database';

export function makeStartGameUsecase(): StartGameUsecase {
  return makeDatabaseStartGameUsecase();
}
