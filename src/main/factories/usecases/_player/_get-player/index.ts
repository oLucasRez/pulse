import { GetPlayerUsecase } from '@domain/usecases';

import { makeDatabaseGetPlayerUsecase } from './database';

export function makeGetPlayerUsecase(): GetPlayerUsecase {
  return makeDatabaseGetPlayerUsecase();
}
