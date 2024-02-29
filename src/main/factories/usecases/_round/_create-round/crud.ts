import { CRUDCreateRoundUsecase } from '@data/usecases';
import { CreateRoundUsecase } from '@domain/usecases';

import { makeRoundCRUD } from '@main/factories';

export function makeCRUDCreateRoundUsecase(): CreateRoundUsecase {
  const roundCRUD = makeRoundCRUD();

  return new CRUDCreateRoundUsecase({ roundCRUD });
}
