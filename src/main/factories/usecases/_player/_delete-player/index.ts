import { DeletePlayerUsecase } from '@domain/usecases';

import { makeDAODeletePlayerUsecase } from './dao';

export function makeDeletePlayerUsecase(): DeletePlayerUsecase {
  return makeDAODeletePlayerUsecase();
}
