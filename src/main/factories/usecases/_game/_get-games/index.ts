import { GetGamesUsecase } from '@domain/usecases';

import { makeDAOGetGamesUsecase } from './dao';

export function makeGetGamesUsecase(): GetGamesUsecase {
  return makeDAOGetGamesUsecase();
}
