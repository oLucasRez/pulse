import { DeletePlayerUsecase } from '@domain/usecases';

import { makeDAODeletePlayerUsecase } from './crud';

export function makeDeletePlayerUsecase(): DeletePlayerUsecase {
  return makeDAODeletePlayerUsecase();
}
