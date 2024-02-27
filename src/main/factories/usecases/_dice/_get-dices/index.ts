import { GetDices } from '@data/usecases';
import { GetDicesUsecase } from '@domain/usecases';

import { makeDiceCRUD } from '@main/factories';

export function makeGetDicesUsecase(): GetDicesUsecase {
  const diceCRUD = makeDiceCRUD();

  return new GetDices({ diceCRUD });
}
