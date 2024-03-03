import { GetCurrentPlayerUsecase } from '@domain/usecases';

import { makeCRUDGetCurrentPlayerUsecase } from './crud';

export function makeGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  return makeCRUDGetCurrentPlayerUsecase();
}
