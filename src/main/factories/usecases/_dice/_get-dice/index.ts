import { GetDiceUsecase } from '@domain/usecases';

import { makeDatabaseGetDiceUsecase } from './database';

export function makeGetDiceUsecase(): GetDiceUsecase {
  return makeDatabaseGetDiceUsecase();
}
