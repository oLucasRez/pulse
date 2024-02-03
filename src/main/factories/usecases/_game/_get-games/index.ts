import { GetGamesUsecase } from '@domain/usecases';

import { makeDatabaseGetGamesUsecase } from './database';

export function makeGetGamesUsecase(): GetGamesUsecase {
  return makeDatabaseGetGamesUsecase();
}
