import { GetRoundUsecase } from '@domain/usecases';

import { makeDAOGetRoundUsecase } from './crud';

export function makeGetRoundUsecase(): GetRoundUsecase {
  return makeDAOGetRoundUsecase();
}
