import { CreateRoundUsecase } from '@domain/usecases';

import { makeDatabaseCreateRoundUsecase } from './database';

export function makeCreateRoundUsecase(): CreateRoundUsecase {
  return makeDatabaseCreateRoundUsecase();
}
