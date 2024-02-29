import { DeletePlayerUsecase } from '@domain/usecases';

import { makeCRUDDeletePlayerUsecase } from './crud';

export function makeDeletePlayerUsecase(): DeletePlayerUsecase {
  return makeCRUDDeletePlayerUsecase();
}
