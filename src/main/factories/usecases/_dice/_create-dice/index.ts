import { CreateDiceUsecase } from '@domain/usecases';

import { makeDatabaseCreateDiceUsecase } from './database';

export function makeCreateDiceUsecase(): CreateDiceUsecase {
  return makeDatabaseCreateDiceUsecase();
}
