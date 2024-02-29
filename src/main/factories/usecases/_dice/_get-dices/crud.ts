import { CRUDGetDicesUsecase } from '@data/usecases';
import { GetDicesUsecase } from '@domain/usecases';

import { makeDiceCRUD } from '@main/factories';

export function makeCRUDGetDicesUsecase(): GetDicesUsecase {
  const diceCRUD = makeDiceCRUD();

  return new CRUDGetDicesUsecase({ diceCRUD });
}
