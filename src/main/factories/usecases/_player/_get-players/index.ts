import { GetPlayersUsecase } from '@domain/usecases';

import { makeDAOGetPlayersUsecase } from './crud';

export function makeGetPlayersUsecase(): GetPlayersUsecase {
  return makeDAOGetPlayersUsecase();
}
