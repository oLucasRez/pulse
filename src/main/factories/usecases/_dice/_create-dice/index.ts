import { CreateDice } from '@data/usecases';
import { CreateDiceUsecase } from '@domain/usecases';

import { makeDiceCRUD } from '@main/factories';

export function makeCreateDiceUsecase(): CreateDiceUsecase {
  const diceCRUD = makeDiceCRUD();

  return new CreateDice({ diceCRUD });
}
