import { CreateGameUsecase } from '@domain/usecases';

import { makeDatabaseCreateGameUsecase } from './database';

export function makeCreateGameUsecase(): CreateGameUsecase {
  return makeDatabaseCreateGameUsecase();
}
