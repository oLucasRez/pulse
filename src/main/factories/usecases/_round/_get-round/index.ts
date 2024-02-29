import { GetRoundUsecase } from '@domain/usecases';

import { makeCRUDGetRoundUsecase } from './crud';

export function makeGetRoundUsecase(): GetRoundUsecase {
  return makeCRUDGetRoundUsecase();
}
