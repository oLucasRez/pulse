import { GetDice } from '@data/usecases';
import { GetDiceUsecase } from '@domain/usecases';

import { makeDiceCRUD } from '@main/factories';

export function makeGetDiceUsecase(): GetDiceUsecase {
  const diceCRUD = makeDiceCRUD();

  return new GetDice({ diceCRUD });
}
