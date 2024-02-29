import { CreateDiceUsecase } from '@domain/usecases';

import { makeCRUDCreateDiceUsecase } from './crud';

export function makeCreateDiceUsecase(): CreateDiceUsecase {
  return makeCRUDCreateDiceUsecase();
}
