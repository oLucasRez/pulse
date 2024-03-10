import { CreateRoundUsecase } from '@domain/usecases';

import { makeDAOCreateRoundUsecase } from './crud';

export function makeCreateRoundUsecase(): CreateRoundUsecase {
  return makeDAOCreateRoundUsecase();
}
