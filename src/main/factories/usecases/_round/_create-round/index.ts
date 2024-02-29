import { CreateRoundUsecase } from '@domain/usecases';

import { makeCRUDCreateRoundUsecase } from './crud';

export function makeCreateRoundUsecase(): CreateRoundUsecase {
  return makeCRUDCreateRoundUsecase();
}
