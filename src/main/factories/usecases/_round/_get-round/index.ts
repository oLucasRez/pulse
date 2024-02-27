import { GetRoundUsecase } from '@domain/usecases';

import { makeDatabaseGetRoundUsecase } from './database';

export function makeGetRoundUsecase(): GetRoundUsecase {
  return makeDatabaseGetRoundUsecase();
}
