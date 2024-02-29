import { GetPlayerUsecase } from '@domain/usecases';

import { makeCRUDGetPlayerUsecase } from './crud';

export function makeGetPlayerUsecase(): GetPlayerUsecase {
  return makeCRUDGetPlayerUsecase();
}
