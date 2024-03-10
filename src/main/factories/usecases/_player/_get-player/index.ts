import { GetPlayerUsecase } from '@domain/usecases';

import { makeDAOGetPlayerUsecase } from './crud';

export function makeGetPlayerUsecase(): GetPlayerUsecase {
  return makeDAOGetPlayerUsecase();
}
