import { GetCurrentPlayerUsecase } from '@domain/usecases';

import { makeDAOGetCurrentPlayerUsecase } from './crud';

export function makeGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  return makeDAOGetCurrentPlayerUsecase();
}
