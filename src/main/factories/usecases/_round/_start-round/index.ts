import { StartRoundUsecase } from '@domain/usecases';

import { makeDAOStartRoundUsecase } from './dao';

export function makeStartRoundUsecase(): StartRoundUsecase {
  return makeDAOStartRoundUsecase();
}
