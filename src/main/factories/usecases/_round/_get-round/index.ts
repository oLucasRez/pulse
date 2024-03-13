import { GetRoundUsecase } from '@domain/usecases';

import { makeDAOGetRoundUsecase } from './dao';

export function makeGetRoundUsecase(): GetRoundUsecase {
  return makeDAOGetRoundUsecase();
}
