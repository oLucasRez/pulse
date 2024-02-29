import { GetDiceUsecase } from '@domain/usecases';

import { makeCRUDGetDiceUsecase } from './crud';

export function makeGetDiceUsecase(): GetDiceUsecase {
  return makeCRUDGetDiceUsecase();
}
