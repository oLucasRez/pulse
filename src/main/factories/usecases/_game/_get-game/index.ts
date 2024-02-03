import { GetGameUsecase } from '@domain/usecases';

import { makeDatabaseGetGameUsecase } from './database';

export function makeGetGameUsecase(): GetGameUsecase {
  return makeDatabaseGetGameUsecase();
}
