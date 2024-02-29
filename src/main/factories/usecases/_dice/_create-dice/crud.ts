import { CRUDCreateDiceUsecase } from '@data/usecases';
import { CreateDiceUsecase } from '@domain/usecases';

import { makeDiceCRUD } from '@main/factories';

export function makeCRUDCreateDiceUsecase(): CreateDiceUsecase {
  const diceCRUD = makeDiceCRUD();

  return new CRUDCreateDiceUsecase({ diceCRUD });
}
