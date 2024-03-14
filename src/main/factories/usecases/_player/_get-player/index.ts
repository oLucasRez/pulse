import { GetPlayerUsecase } from '@domain/usecases';

import { makeDAOGetPlayerUsecase } from './dao';

export function makeGetPlayerUsecase(): GetPlayerUsecase {
  return makeDAOGetPlayerUsecase();
}
