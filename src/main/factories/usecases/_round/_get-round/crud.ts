import { CRUDGetRoundUsecase } from '@data/usecases';
import { GetRoundUsecase } from '@domain/usecases';

import { makeRoundCRUD } from '@main/factories';

export function makeCRUDGetRoundUsecase(): GetRoundUsecase {
  const roundCRUD = makeRoundCRUD();

  return new CRUDGetRoundUsecase({ roundCRUD });
}
