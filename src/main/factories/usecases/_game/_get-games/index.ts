import { GetGamesUsecase } from '@domain/usecases';

import { makeCRUDGetGamesUsecase } from './crud';

export function makeGetGamesUsecase(): GetGamesUsecase {
  return makeCRUDGetGamesUsecase();
}
