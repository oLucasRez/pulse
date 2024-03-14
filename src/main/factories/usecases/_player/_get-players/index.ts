import { GetPlayersUsecase } from '@domain/usecases';

import { makeDAOGetPlayersUsecase } from './dao';

export function makeGetPlayersUsecase(): GetPlayersUsecase {
  return makeDAOGetPlayersUsecase();
}
