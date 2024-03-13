import { CreateRoundUsecase } from '@domain/usecases';

import { makeDAOCreateRoundUsecase } from './dao';

export function makeCreateRoundUsecase(): CreateRoundUsecase {
  return makeDAOCreateRoundUsecase();
}
