import { GetGamesUsecase } from '@domain/usecases';

import { makeDAOGetGamesUsecase } from './crud';

export function makeGetGamesUsecase(): GetGamesUsecase {
  return makeDAOGetGamesUsecase();
}
