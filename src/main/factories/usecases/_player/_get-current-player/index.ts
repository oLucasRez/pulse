import { GetCurrentPlayerUsecase } from '@domain/usecases';

import { makeDAOGetCurrentPlayerUsecase } from './dao';

export function makeGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  return makeDAOGetCurrentPlayerUsecase();
}
