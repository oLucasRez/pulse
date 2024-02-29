import { CRUDGetDiceUsecase } from '@data/usecases';
import { GetDiceUsecase } from '@domain/usecases';

import { makeDiceCRUD } from '@main/factories';

export function makeCRUDGetDiceUsecase(): GetDiceUsecase {
  const diceCRUD = makeDiceCRUD();

  return new CRUDGetDiceUsecase({ diceCRUD });
}
