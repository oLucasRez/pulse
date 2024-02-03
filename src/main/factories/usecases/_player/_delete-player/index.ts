import { DeletePlayerUsecase } from '@domain/usecases';

import { makeDatabaseDeletePlayerUsecase } from './database';

export function makeDeletePlayerUsecase(): DeletePlayerUsecase {
  return makeDatabaseDeletePlayerUsecase();
}
